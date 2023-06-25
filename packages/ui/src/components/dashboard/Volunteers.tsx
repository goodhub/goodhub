import { FC, useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';
import { RiMessage2Line } from 'react-icons/ri';
import { useOrganisationService, getVolunteersForOrganisation } from '../../services/organisation-service';
import Button from '../generic/Button';
import Page from '../generic/Page';
import Table, { HeadingType } from '../generic/Table';
import Title from '../generic/Title';

export interface VolunteersProps {}

const Volunteers: FC<VolunteersProps> = () => {
  const organisation = useOrganisationService(state => state.organisation);
  const [volunteers, setVolunteers] = useState<any>();

  useEffect(() => {
    (async () => {
      if (!organisation) return;
      const volunteers = await getVolunteersForOrganisation(organisation.id);
      setVolunteers(volunteers);
    })();
  }, [organisation]);
  return (
    <Page
      title="Volunteers"
      actions={[
        {
          name: (
            <>
              <FaRegCopy className="-ml-0.5 mr-3 h-5" />
              Copy invite link
            </>
          ),
          onClick: () => {}
        },
        {
          name: (
            <>
              <MdMailOutline className="-ml-1 mr-2 h-5 w-5" />
              Email all volunteers
            </>
          ),
          onClick: () => {}
        },
        {
          name: (
            <>
              <RiMessage2Line className="-ml-1 mr-2 h-5 w-5" />
              Text all volunteers
            </>
          ),
          onClick: () => {}
        }
      ]}
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <Title size="xl">New</Title>
          <Button mode="plain">Contact new volunteers</Button>
        </div>
        <Table
          placeholder="You don't have any volunteers at the moment"
          headings={[{ name: 'id', type: HeadingType.Text }]}
          content={volunteers}
        />
        <Title size="xl" className="mb-2 mt-6">
          All
        </Title>
        <Table
          placeholder="You don't have any volunteers at the moment"
          headings={[{ name: 'id', type: HeadingType.Text }]}
          content={volunteers}
        />
      </div>
    </Page>
  );
};

export default Volunteers;
