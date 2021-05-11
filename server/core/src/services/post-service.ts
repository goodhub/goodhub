import db from  './database-client';
import { col, DataTypes, fn, Model, Op } from 'sequelize';

import { v4 } from 'uuid';
import * as Sentry from '@sentry/node';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, requiredJSON, optionalJSON, optionalString, requiredDate } from '../helpers/db';
import { getKeywords } from '../helpers/text-processing';
import { IComment, IPost, IPostParent } from '@strawberrylemonade/goodhub-lib';
import { intersection } from 'lodash';

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

export const createPost = async (personId: string, post: IPost) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!post) throw new MissingParameterError('post');

  try {
    const tags: string[] = [];
    const response = await Post.create({ ...post, id: v4(), postedAt: new Date(), postedBy: personId, tags, parentId: IPostParent.Feed, comments: [], likes: [] });
    return response.toJSON() as IPost;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this post.');
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
    const post = await Post.findOne({ where: { id: postId }});
    await post.update({ likes: fn('array_append', col('likes'), personId) })
    return post.toJSON() as IPost;  
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
    const posts = await Post.findAll({ where: { parentId: IPostParent.Feed }, order: [['postedAt', 'DESC']], attributes: [ ...Object.keys(Metadata), ...Object.keys(Content) ]});
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getForumPostsBySearch = async (search: string) => {
  if (!search) throw new MissingParameterError('search');

  const keywords = getKeywords(search);
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
    const posts = await Post.findAll({ where: { parentId: IPostParent.Feed, organisationId }});
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