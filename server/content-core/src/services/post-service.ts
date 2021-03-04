import db from  './database-client';
import { DataTypes, Model } from 'sequelize';

import { v4 } from 'uuid';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, requiredJSON, optionalJSON, optionalString, requiredDate } from '../helpers/db';
import { IPost } from 'goodhub-lib';

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
    const project = await Post.create({ ...post, id: v4(), postedAt: new Date(), postedBy: personId, tags });
    return project.toJSON() as IPost;
  } catch (e) {
    throw new DatabaseError('Could not save this post.');
  }
}

export const getPost = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const project = await Post.findOne({ where: { id }});
    return project.toJSON() as IPost;  
  } catch (e) {
    throw new DatabaseError('Could not get this post.');
  }
}

export const getPostsByProject = async (projectId: string) => {
  if (!projectId) throw new MissingParameterError('organisationId');

  try {
    const projects = await Post.findAll({ where: { projectId }});
    return projects.map((res: any) => res.toJSON() as IPost);  
  } catch (e) {
    throw new DatabaseError('Could not get these posts.');
  }
}