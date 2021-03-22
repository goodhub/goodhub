import db from  './database-client';
import { col, DataTypes, fn, Model } from 'sequelize';

import { v4 } from 'uuid';
import * as Sentry from '@sentry/node';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, requiredJSON, optionalJSON, optionalString, requiredDate } from '../helpers/db';
import { IPost } from '@strawberrylemonade/goodhub-lib';

class Post extends Model {}

(async () => {
  try {
    Post.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      projectId: { ...requiredString },
      organisationId: { ...requiredString },
      postedAt: { ...requiredDate },
      postedBy: { ...requiredString },
      origin: { ...requiredString },

      postedIdentity: { ...requiredString },
      type: { ...requiredString },
      tags: { 
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      likes: { 
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },

      text: { ...requiredJSON },
      summary: { ...optionalString },
      hero: { ...optionalJSON },
      connections: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
      }
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
    const response = await Post.create({ ...post, id: v4(), postedAt: new Date(), postedBy: personId, tags });
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

export const getPopularPosts = async () => {
  try {
    const posts = await Post.findAll();
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}

export const getPostsByProject = async (projectId: string) => {
  if (!projectId) throw new MissingParameterError('organisationId');

  try {
    const posts = await Post.findAll({ where: { projectId }});
    return posts.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these posts.');
  }
}