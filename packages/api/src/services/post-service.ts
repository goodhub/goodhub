import db from  './database-client';
import { col, DataTypes, fn, Model, Op } from 'sequelize';

import { v4 } from 'uuid';
import * as Sentry from '@sentry/node';

import { MissingParameterError, DatabaseError, NotFoundError } from '../common/errors';
import { syncOptions, requiredString, requiredJSON, optionalJSON, optionalString, requiredDate } from '../helpers/db';
import { getOrganisationSocialConfiguration } from './organisation-service';
import { getKeywords } from '../helpers/text-processing';
import { IComment, IPost, IPostParent, IPostStatus, ISocial } from '../types';
import { intersection } from 'lodash';
import fetch from 'node-fetch';

class Post extends Model {}

const Metadata = {
  id: {
    ...requiredString,
    primaryKey: true
  },
  tags: { 
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  parentId: { ...requiredString },
  projectId: { ...requiredString },
  organisationId: { ...requiredString },
  postedAt: { ...requiredDate },
  postedBy: { ...requiredString },
  origin: { ...requiredString },
  postedIdentity: { ...requiredString },
  type: { ...requiredString },
  keywords: { 
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  }
};

const Content = {
  text: { ...requiredJSON },
  title: { ...optionalString },
  summary: { ...optionalString },
  hero: { ...optionalJSON },
};

const Connections = {
  likes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  comments: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  connections: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  targets: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  publishedToWebsite: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  publishedToFeed: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
};

(async () => {
  try {
    Post.init({
      ...Metadata,
      ...Content,
      ...Connections
    }, {
      sequelize: await db(),
      modelName: 'Post'
    })
    
    await Post.sync(syncOptions)
    console.log('[DEV] Successful table sync for "Post"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Post"');
    console.error(err);
    process.exit(1);
  }
})()

export const createPost = async (personId: string, candidate: IPost, targets: ISocial[] = []) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!candidate) throw new MissingParameterError('post');

  try {
    const tags: string[] = [];
    const post = { 
      ...candidate, 
      id: v4(), 
      postedAt: new Date(), 
      postedBy: personId, 
      status: IPostStatus.Scheduled,
      tags, 
      parentId: IPostParent.Feed, 
      comments: new Array<IComment>(), 
      likes: new Array<string>(), 
      targets,
    }

    const response = await Post.create(post);
    if (!post.scheduledDate) {
      await publishPost(post);
      await response.reload();
    }

    return response.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this post.');
  }
}

export const updatePost = async (personId: string, candidate: IPost, targets: ISocial[] = []) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!candidate) throw new MissingParameterError('post');

  try {
    const post = await Post.findByPk(candidate.id);
    await post.update({ ...candidate, postedBy: personId, targets }, { fields: ['targets', ...Object.keys(Content), 'postedBy', 'scheduledDate', 'projectId'] })
    return post.toJSON() as IPost;  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this post.');
  }
}

export const createForumPost = async (personId: string, post: IPost) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!post) throw new MissingParameterError('post');

  try {
    const tags: string[] = [];
    const keywords = getKeywords(post.title);
    const response = await Post.create({ ...post, id: v4(), postedAt: new Date(), postedBy: personId, tags, keywords, parentId: IPostParent.Forum, comments: [], likes: [] });
    return response.toJSON() as IPost;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this post.');
  }
}

export const publishPost = async (post: IPost) => {
  if (!post) throw new MissingParameterError('post');

  try {
    if (!post) throw new NotFoundError('This post cannot be found.');

    const connections = post.targets ? await Promise.all(post.targets.map(async (target) => {
      const response = postToExternalSocial(target, post);
      return { ...response, source: target }
    })) : [];

    return Post.update({ connections, postedAt: new Date(), status: IPostStatus.Posted, publishedToWebsite: true, publishedToFeed: true }, { where: { id: post.id }});
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not publish this post.');
  }
}

export const publishPendingPosts = async () => {
  try {
    const posts = await Post.findAll({ where: { parentId: IPostParent.Feed, status: IPostStatus.Scheduled, scheduledDate: { [Op.lt]: new Date() } }, order: [['postedAt', 'DESC']], attributes: [ ...Object.keys(Metadata), ...Object.keys(Content), ...Object.keys(Connections) ]});
    await Promise.all(posts.map((res) => publishPost(res.toJSON() as IPost)));
    return { message: `Posted ${posts.length} pending posts.`}
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getPost = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const post = await Post.findOne({ where: { id }});
    return post.toJSON() as IPost;  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this post.');
  }
}


export const addLikeToPost = async (personId: string, postId: string) => {
  if (!personId) throw new MissingParameterError('id');
  if (!postId) throw new MissingParameterError('postId');

  try {
    const post = await Post.findByPk(postId);
    const likes = post.get('likes') as string[];
    if (likes.includes(personId)) return post.toJSON() as IPost;
    await post.update({ likes: fn('array_append', col('likes'), personId) })
    const response =  await Post.findByPk(postId)
    return response.toJSON();
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this post.');
  }
}

export const addCommentToPost = async (personId: string, postId: string, comment: IComment) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!postId) throw new MissingParameterError('postId');
  if (!comment) throw new MissingParameterError('comment');

  try {
    const post = await Post.findByPk(postId);
    const comments = post.get('comments') as IComment[]
    await post.update({ comments: [...comments, { ...comment, postedBy: personId, postedAt: new Date(), id: v4()} ] })
    return post.toJSON() as IPost;  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this post.');
  }
}

export const getPopularPosts = async () => {
  try {
    const posts = await Post.findAll({ where: { parentId: IPostParent.Feed, publishedToFeed: { [Op.or] : [true, null]}, status: { [Op.or] : [IPostStatus.Posted, null] } }, order: [['postedAt', 'DESC']], attributes: [ ...Object.keys(Metadata), ...Object.keys(Content), ...Object.keys(Connections) ]});
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getForumPostsBySearch = async (search: string) => {
  if (!search) throw new MissingParameterError('search');

  const keywords = getKeywords(search) as [string, string];
  try {
    const response = await Post.findAll({ where: { parentId: IPostParent.Forum, keywords: { [Op.overlap]: keywords } }, order: [['postedAt', 'DESC']], attributes: [ ...Object.keys(Metadata), ...Object.keys(Content) ]});
    const posts = response.map((res: any) => {
      const post = res.toJSON() as IPost & { score: number };

      const targetKeywords = post.keywords ?? [];
      const keywordsMatch = intersection(keywords, targetKeywords).length;
      const interactionCount = (post.comments?.length ?? 0) + (post.likes?.length ?? 0);
      post.score = (() => {
        if (!interactionCount) return keywordsMatch;
        return keywordsMatch * interactionCount;
      })()
      return post;
    });
    return posts.sort((a, b) => { return b.score - a.score });
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getSocialPostsByOrganisation = async (organisationId: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const posts = await Post.findAll({ where: { parentId: IPostParent.Feed, organisationId, status: { [Op.or] : [IPostStatus.Posted, null] } }});
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getScheduledSocialPostsByOrganisation = async (organisationId: string) => {
  if (!organisationId) throw new MissingParameterError('organisationId');

  try {
    const posts = await Post.findAll({ where: { parentId: IPostParent.Feed, organisationId, status: IPostStatus.Scheduled }});
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getPostsByProject = async (projectId: string) => {
  if (!projectId) throw new MissingParameterError('projectId');

  try {
    const posts = await Post.findAll({ where: { projectId }});
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

const uploadPhotoToFacebook = async (photoUrl: string, pageToken: string, pageId: string) => {
  const url = new URL(`https://graph.facebook.com/${pageId}/photos`)
  url.searchParams.set('access_token', pageToken);
  url.searchParams.set('url', photoUrl);
  url.searchParams.set('no_story', 'false');
  url.searchParams.set('published', 'false')
  url.searchParams.set('temporary', 'true')
  const response = await fetch(url.toString(), { method: 'POST'});
  const data = await response.json();
  return data;
}

const postToFacebook = async (post: IPost) => {
  const { social } = await getOrganisationSocialConfiguration(post.organisationId);
  const { pageToken, pageId } = social[ISocial.Facebook];

  const url = new URL(`https://graph.facebook.com/${pageId}/feed`)
  url.searchParams.set('access_token', pageToken);

  // Add content
  url.searchParams.set('message', post.text.blocks.reduce((message, value) => (message + '\n' + value.text), ''));
  if (post.hero?.type === 'graphic') {
    const { id } = await uploadPhotoToFacebook(post.hero.image.original, pageToken, pageId);
    url.searchParams.set('attached_media[0]', JSON.stringify({ "media_fbid": id }));
  }

  if (post.hero?.type === 'video') {
    url.searchParams.set('link', post.hero.video.url);
  }

  if (post.hero?.type === 'link') {
    url.searchParams.set('link', post.hero.link.url);
  }

  const response = await fetch(url.toString(), { method: 'POST'});
  const { id: postId } = await response.json();
  return { postId, pageId };
}

export const postToExternalSocial = async (social: ISocial, post: IPost): Promise<{ pageId: string, postId: string }> => {
  switch (social) {
    case ISocial.Facebook:
      return postToFacebook(post);
  }
}