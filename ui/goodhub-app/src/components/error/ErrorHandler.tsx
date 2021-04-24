import { Transition } from '@headlessui/react';
import { FC, Fragment, useEffect } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router';
import { useErrorService } from '../../services/error-service';
import Button from '../generic/Button';
import Spinner from '../generic/Spinner';
import Error from './Error';

export interface ErrorHandlerProps { }

const ErrorHandler: FC<ErrorHandlerProps> = () => {

  const { error, eventId } = useErrorService(state => ({ error: state.error, eventId: state.eventId }))
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (!error) return;

    if (error.code === 401) {
      
      setTimeout(() => {
        history.push('/me/login', { restore: location.pathname })
      }, 1500);
    }
  }, [error, location, history])

  return <>
    {/* Global notification live region, render this permanently at the end of the document */}
    { error ? <div className="fixed inset-0 w-screen h-screen flex flex-col justify-center sm:items-center bg-white z-50">
      <div className="m-8 sm:m-0 sm:-mt-8 w-full max-w-xl">
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${error.code === 401 ? 'bg-primary-50' : 'bg-red-100'}`}>
          { error.code === 401 
            ? <FiAlertTriangle className="h-6 w-6 text-primary-400" aria-hidden="true" />
            : <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
          }
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-4xl font-bold tracking-tight text-gray-900">
            { error.code === 401
              ? 'For security purposes, you will need to log in again.'
              : `We're so sorry, something has gone really wrong.` }
          </h3>
          <div className="my-5">
            { error.code === 401
              ? null 
              : <Error message={error.message} eventId={eventId} /> }
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
      { error.code === 401
        ? <Spinner /> 
        : <Button to="/me/login">Go to homepage</Button> }
      </div>
    </div> : null}

    <div
      aria-live="assertive"
      className="fixed top-8 z-30 inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
      <Transition
        show={!!error}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">

              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
                <p className="mt-1 text-sm text-gray-500">{error?.message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => { }}
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </>;
}

export default ErrorHandler;