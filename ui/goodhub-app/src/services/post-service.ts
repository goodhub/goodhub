import create, { State } from 'zustand';
import produce from 'immer';
import { IPerson, IPost, withTransaction } from '@strawberrylemonade/goodhub-lib';

import { handleAPIError } from '../helpers/errors';
import { getDefaultFetchOptions } from './authentication-service';

export enum CacheStatus {
  Loading = 'Loading',
  Retrieved = 'Retrieved'
}

type Cache<T> = { 
  [key: string]: {
    status: CacheStatus
    loader?: string
    cache?: T
  }
}

export interface PostService extends State {
  organisations: Cache<string>
  people: Cache<IPerson>
  addOrganisationToCache: (organisation: string) => void

  initiatedPersonLookup: (personId: string, loaderId: string) => void
  addPersonToCache: (person: IPerson) => void
}

export const usePostService = create<PostService>((set) => ({
  organisations: {},
  people: {},
  addOrganisationToCache: (organisation: string) => set(produce(state => {
    
  })),
  initiatedPersonLookup: (personId: string, loaderId: string) => set(produce((state: PostService) => {
    if (state.people[personId]?.status === CacheStatus.Loading) return;
    state.people[personId] = { status: CacheStatus.Loading, loader: loaderId };
  })),
  addPersonToCache: (person: IPerson) => set(produce((state: PostService) => {
    state.people[person.id] = { status: CacheStatus.Retrieved, cache: person };
  })),
}))

const hydratePost = (post: IPost) => {
  post.postedAt = new Date(post.postedAt);
  return post;
}

export const submitNewPost = withTransaction(async (candidate: Partial<IPost>) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/posts`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(candidate)
  });
  await handleAPIError(response);
  const post = await response.json();
  return hydratePost(post);
}, 'Submit new post');

export const getPopularPosts = async () => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/posts/popular`, options);
  await handleAPIError(response);
  const posts = await response.json();
  return posts.map(hydratePost)
};