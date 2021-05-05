import { FC, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { BsFilePost } from 'react-icons/bs';
import { MdSearch } from 'react-icons/md';
import { TiLocationArrow, TiStarFullOutline } from 'react-icons/ti';

import { searchForum } from '../../services/post-service';
import Card from '../generic/Card';
import Page from '../generic/Page';
import Spinner from '../generic/Spinner';
import Title from '../generic/Title';

export interface ConversationsProps { }

const Conversations: FC<ConversationsProps> = () => {

  const [results, setResults] = useState<any[]>();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const getSearchResults = useCallback(debounce(async (term) => {
    setSearchLoading(true);
    const results = await searchForum(term);
    setResults(results);
    setSearchLoading(false);
  }, 800, { trailing: true, leading: false }), [])

  const onSearchTermChange = async (term: string) => {
    setSearchTerm(term);
    if (!term || term.length < 3) {
      setResults(undefined);
      return;
    };
    getSearchResults(term);
  }

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
        type="text"
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
        <Title size="lg" className="flex items-center mt-6 mb-2"><BsFilePost className="mr-1 w-5 h-5" />Results</Title>
        {results.map(a => <p>• {a.title}</p>)}
      </>
      : <>
        <Title size="lg" className="flex items-center mt-6 mb-2"><TiStarFullOutline className="mr-1" />Popular</Title>
        <Card className="p-4">

        </Card>

        <Title size="lg" className="flex items-center mt-6 mb-2"><TiStarFullOutline className="mr-1" />Tips</Title>
        <Card className="p-4">

        </Card>

        <Title size="lg" className="flex items-center mt-6 mb-2"><TiLocationArrow className="-ml-0.5 w-6 h-6" />Location</Title>
      </>
    }
  </Page>;
}

export default Conversations;