import { FiChevronDown } from 'react-icons/fi';
import { useOrganisations } from '../../services/hooks/organisations';
import { Menu, Transition } from '@headlessui/react';
import Button from '../generic/Button';
import { Fragment, useState } from 'react';
import Navigation from '../../translations/Navigation';
import { useHistory } from 'react-router-dom';
import Skeleton from '../generic/Skeleton';
import CreateOrganisationWizard from '../dashboard/organisation-configuration/CreateOrganisationWizard';
import { ModalState } from '../generic/Modal';

export const OrganisationSwitcher = () => {
  const { organisation, organisations, setOrganisation } = useOrganisations();
  const history = useHistory();
  const [createOrganisationModalState, setCreateOrganisationModalState] = useState<ModalState>(ModalState.Closed);

  return (
    <>
      <CreateOrganisationWizard
        modalState={createOrganisationModalState}
        onDismiss={() => setCreateOrganisationModalState(ModalState.Closed)}
      />
      <Menu as="div" className="relative w-full inline-block">
        {({ open }) => (
          <>
            <Menu.Button as="button" className="w-full text-left inline-flex items-center">
              <div className="flex-1 flex flex-col">
                <div className="text-sm font-medium text-gray-900">{organisation?.name}</div>
                <div className="text-xs text-gray-500">Organisation Admin</div>
              </div>
              <div className="flex justify-center items-center">
                <FiChevronDown />
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right sm:origin-top-left absolute right-0 sm:right-auto sm:left-0 mt-2 p-2 w-max-content rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {organisations ? (
                  organisations.map(o => {
                    return (
                      <Menu.Item
                        as="button"
                        className="w-full"
                        onClick={() => history.push(`/dashboard/${typeof o !== 'string' ? o.id : o}`)}
                      >
                        <div className="w-full cursor-pointer flex items-center p-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-100">
                          <div className={`w-8 h-8 border overflow-hidden border-gray-300 rounded-lg mr-3`}>
                            {typeof o !== 'string' ? (
                              <img src={o.profilePicture?.thumbnail} alt={o.profilePicture?.alt} />
                            ) : null}
                          </div>
                          <p>{typeof o !== 'string' ? o.name : <Skeleton width="200" />}</p>
                        </div>
                      </Menu.Item>
                    );
                  })
                ) : (
                  <div className="py-3 px-6 flex justify-center">
                    <p className="text-xs font-medium text-gray-500 uppercase py-1">You are not in any organisations</p>
                  </div>
                )}
                <Button className="mt-1 w-full" onClick={() => setCreateOrganisationModalState(ModalState.Open)}>
                  {Navigation.actions.registerOwnOrganisation}
                </Button>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
