import create, { State } from 'zustand';
import produce from 'immer';
import { IPerson, IPost, IOrganisation, withTransaction, IComment } from '@strawberrylemonade/goodhub-lib';

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
  organisations: Cache<IOrganisation>
  people: Cache<IPerson>

  posts?: IPost[]
  setPosts: (posts: IPost[]) => void
  clearPosts: () => void

  recentlyPostedPost?: IPost
  setRecentlyPostedPost: (post: IPost) => void
  clearRecentlyPostedPost: () => void

  revalidatePosts: () => void

  initiatedOrganisationLookup: (organisationId: string, loaderId: string) => void
  addOrganisationToCache: (organisation: IOrganisation) => void

  initiatedPersonLookup: (personId: string, loaderId: string) => void
  addPersonToCache: (person: IPerson) => void
}

export const usePostService = create<PostService>((set) => ({
  organisations: {},
  people: {},

  setPosts: (posts: IPost[]) => set(produce((state: PostService) => {
    state.posts = posts;
  })),
  clearPosts: () => set((state) => ({ ...state, posts: undefined })),

  setRecentlyPostedPost: (post: IPost) => set(produce((state: PostService) => {
    state.recentlyPostedPost = post;
  })),
  clearRecentlyPostedPost: () => set(produce((state: PostService) => {
    state.recentlyPostedPost = undefined;
  })),

  revalidatePosts: () => set(produce((state: PostService) => {
    state.recentlyPostedPost = undefined;
  })),

  initiatedOrganisationLookup: (organisationId: string, loaderId: string) => set(produce((state: PostService) => {
    if (state.organisations[organisationId]?.status === CacheStatus.Loading) return;
    state.organisations[organisationId] = { status: CacheStatus.Loading, loader: loaderId };
  })),
  addOrganisationToCache: (organisation: IOrganisation) => set(produce(state => {
    state.organisations[organisation.id] = { status: CacheStatus.Retrieved, cache: organisation };
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
  const response = await fetch(`${baseUrl}/feed`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(candidate)
  });
  await handleAPIError(response);
  const post = await response.json();
  return hydratePost(post);
}, 'Submit new post');

export const submitComment = withTransaction(async (postId: string, candidate: Partial<IComment>) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/posts/${postId}/comments`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(candidate)
  });
  await handleAPIError(response);
  const post = await response.json();
  return hydratePost(post);
}, 'Submit new comment');

export const likePost = withTransaction(async (postId: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
    ...options,
    method: 'POST'
  });
  await handleAPIError(response);
  const post = await response.json();
  return hydratePost(post) as IPost;
}, 'Like post');


export const getPopularPosts = withTransaction(async () => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/feed/popular`, options);
  await handleAPIError(response);
  const posts = await response.json();
  return posts.map(hydratePost) as IPost[]
}, 'Get popular posts');

export const getPostsByOrganisationId = withTransaction(async (organisationId: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/feed?organisationId=${organisationId}`, options);
  await handleAPIError(response);
  const posts = await response.json();
  return posts.map(hydratePost) as IPost[]
}, 'Get posts by Organisation ID');

export const getPost = withTransaction(async (postId: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/posts/${postId}`, options);
  await handleAPIError(response);
  const post = await response.json();
  return hydratePost(post) as IPost;
}, 'Get post');

export const searchForum = withTransaction(async (term: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/forum?search=${term}`, options);
  await handleAPIError(response);
  return await response.json() as IPost;;
}, 'Search forum');