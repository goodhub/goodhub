import { FC, Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { IProject, IWebsiteConfiguration } from '../../../../shared';
import { Menu, Transition } from '@headlessui/react';
import { getProjectsForOrganisation } from '../../services/organisation-service';
import Navigation from '../../translations/Navigation';

export interface HeaderProps {
  config: IWebsiteConfiguration;
}

const Header: FC<HeaderProps> = ({ config }) => {
  const [projects, setProjects] = useState<IProject[]>();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const projects = await getProjectsForOrganisation(config.id);
      setProjects(projects);
    })();
  }, [config]);

  return (
    <header className="bg-white shadow-sm w-screen z-20">
      <div className="max-w-6xl mx-auto px-1.5 sm:px-8 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <Link to={`/${config.id}/`} className="flex-shrink-0 flex items-center">
              <p className="text-xl font-bold text-gray-900">{config.name}</p>
            </Link>
            <nav aria-label="Global" className="hidden lg:ml-6 md:flex md:items-center md:space-x-4">
              <Link to={`/${config.id}/about/`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                <p>About us</p>
              </Link>
              {projects?.length ? (
                <Menu as="div" className="relative inline-block text-left">
                  {({ open }) => (
                    <>
                      <Menu.Button
                        as="button"
                        className="flex p-1 cursor-pointer items-center text-base font-medium text-gray-500 hover:text-gray-900"
                      >
                        <p>{Navigation.projects.titleProjects}</p>
                        <FiChevronDown className="ml-1 mt-0.5" />
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
                          {projects ? (
                            projects.map(o => {
                              return (
                                <Menu.Item onClick={() => history.push(`/${config.id}/projects/${o.id}`)}>
                                  <div className="w-full cursor-pointer flex items-center p-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-100">
                                    <p>{o.name}</p>
                                  </div>
                                </Menu.Item>
                              );
                            })
                          ) : (
                            <div className="py-3 px-6 flex flex-col items-center text-xs font-medium text-gray-500 uppercase">
                              <p>We don't have any</p>
                              <p>projects at the moment</p>
                            </div>
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ) : null}
              <Link to={`/${config.id}/news/`} className="text-base font-medium text-gray-500 hover:text-gray-900">
                <p>News</p>
              </Link>
              <a
                href={`tel:${config.contactPhoneNumber}`}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                <p>Get in touch</p>
              </a>
            </nav>
          </div>
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end"></div>
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:bg-opacity-25 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <FiMenu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
