import { FC, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

import { BsFilePost } from 'react-icons/bs';
import { MdSearch } from 'react-icons/md';
import { TiLocationArrow, TiPin, TiStarFullOutline } from 'react-icons/ti';

import { getPost, searchForum } from '../../services/post-service';
import Card from '../generic/Card';
import Page from '../generic/Page';
import Spinner from '../generic/Spinner';
import Title from '../generic/Title';
import { getSetting } from '../../helpers/backstage';
import { IPost } from '@strawberrylemonade/goodhub-lib';
import { PostMetadata } from '../posts/PostMetadata';
import { Link, useRouteMatch } from 'react-router-dom';

export interface ConversationsProps { }

const Conversations: FC<ConversationsProps> = () => {

  const [results, setResults] = useState<any[]>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [tips, setTips] = useState<IPost[]>();

  const match = useRouteMatch();

  const getSearchResults = useMemo(
    () => debounce(async (term) => {
      setSearchLoading(true);
      const results = await searchForum(term);
      setResults(results);
      setSearchLoading(false);
    }, 500, { trailing: true, leading: false }),
    []
  )

  const onSearchTermChange = async (term: string) => {
    setSearchTerm(term);
    if (!term || term.length < 3) {
      setResults(undefined);
      return;
    };
    getSearchResults(term);
  }

  useEffect(() => {
    (async () => {
      const tipsList = await getSetting('content:forum:tips');
      const tips = await Promise.all(tipsList.split(',').map((tipId => getPost(tipId))));
      setTips(tips);
    })()
  }, [setTips])

  return <Page
    title="Conversations"
    actions={[
      { name: 'Create a new discussion', onClick: () => { } }
    ]}
  >
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MdSearch className="h-8 w-8 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        name="conversationSearchTerm"
        id="conversationSearchTerm"
        onChange={(e) => onSearchTermChange(e.target.value)}
        value={searchTerm}
        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-14 py-4 sm:text-lg border-gray-300 rounded-lg"
        placeholder="Search for topics"
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        {searchLoading ? <Spinner size="8" /> : null}
      </div>
    </div>

    {results
      ? <>
        <Title size="base" className="flex items-center mt-6 mb-2">
          <BsFilePost className="mr-1 w-5 h-5" />
          <span>Results</span>
        </Title>
        <div className="grid grid-cols-3 gap-5">
          { results ? results.map(post => <Card className="p-5 h-fit-content space-y-3 cursor-pointer">
            <Title size="base" tight={true} weight="semibold" className="leading-5">{ post.title }</Title>
            <span className="pointer-events-none">
              <PostMetadata identity={post.postedIdentity} postedAt={post.postedAt} personId={post.postedBy} />
            </span>
          </Card>) : null }
        </div>
      </>
      : <>
        <span className="flex items-center mt-6 mb-2">
          <TiStarFullOutline className="mr-1 mb-1" />
          <Title size="base" className="leading-4">Popular</Title>
        </span>

        <span className="flex items-center mt-6 mb-2">
          <TiPin className="mr-1 mb-1 w-5 h-5" />
          <Title size="base" className="leading-4">Tips</Title>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          { tips ? tips.map(post => <Link to={`${match.path}/${post.id}`}>
            <Card className="p-5 h-fit-content space-y-3 cursor-pointer">
              <Title size="base" tight={true} weight="semibold" className="leading-5">{ post.title }</Title>
              <div className="pointer-events-none">
                <PostMetadata identity={post.postedIdentity} organisationId={post.organisationId} postedAt={post.postedAt} personId={post.postedBy} />
              </div>
            </Card>
          </Link>) : null }
        </div>

        <span className="flex items-center mt-6 mb-2">
          <TiLocationArrow className="-ml-0.5 mb-1 w-6 h-6" />
          <Title size="base" className="leading-4">Location</Title>
        </span>
      </>
    }
  </Page>;
}

export default Conversations;