import db from  './database-client';
import { Model } from 'sequelize';

import { v4 } from 'uuid';
import * as Sentry from '@sentry/node';

import { MissingParameterError, DatabaseError } from '../common/errors';
import { syncOptions, requiredString, requiredJSON, optionalString, requiredDate } from '../helpers/db';
import { IComment } from '@strawberrylemonade/goodhub-lib';

class Comment extends Model {}

(async () => {
  try {
    Comment.init({
      id: {
        ...requiredString,
        primaryKey: true
      },
      parentId: { ...requiredString },
      postedAt: { ...requiredDate },
      postedBy: { ...requiredString },
      postedIdentity: { ...requiredString },
      content: { ...requiredJSON },
      replyId: { ...optionalString }
    }, {
      sequelize: await db(),
      modelName: 'Comment'
    })
    
    await Comment.sync(syncOptions)
    console.log('[DEV] Successful table sync for "Comment"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Comment"');
    console.error(err);
    process.exit(1);
  }
})()

export const createComment = async (personId: string, postId: string, comment: IComment) => {
  if (!personId) throw new MissingParameterError('personId');
  if (!postId) throw new MissingParameterError('postId');
  if (!comment) throw new MissingParameterError('comment');

  try {
    const response = await Comment.create({ ...comment, id: v4(), parentId: postId, postedAt: new Date(), postedBy: personId });
    return response.toJSON() as IComment;
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not save this comment.');
  }
}

export const getComment = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const post = await Comment.findOne({ where: { id }});
    return post.toJSON() as IComment;  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get this comment.');
  }
}

export const getCommentsForPost = async (parentId: string) => {
  if (!parentId) throw new MissingParameterError('parentId');

  try {
    const posts = await Comment.findAll({ where: { parentId }});
    return posts.map((res: any) => res.toJSON() as IComment);  
  } catch (e) {
    Sentry.captureException(e);
    throw new DatabaseError('Could not get these comments.');
  }
}