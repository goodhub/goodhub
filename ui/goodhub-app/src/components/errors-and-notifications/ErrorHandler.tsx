import { FC, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { RiEyeOffLine } from 'react-icons/ri';
import { useHistory, useLocation } from 'react-router';
import { useErrorService } from '../../services/error-service';
import Button from '../generic/Button';
import Spinner from '../generic/Spinner';
import Error from './Error';

export interface ErrorHandlerProps { }

const ErrorHandler: FC<ErrorHandlerProps> = () => {

  const { error, eventId, clearError } = useErrorService(state => ({ error: state.error, eventId: state.eventId, clearError: state.clearError }))
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

  const getIconForErrorCode = (code?: number) => {
    switch (code) {
      case 401:
        return <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-50">
          <FiAlertTriangle className="h-6 w-6 text-primary-400" aria-hidden="true" />
        </div>
      case 403:
        return <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
          <RiEyeOffLine className="h-6 w-6 text-orange-400" aria-hidden="true" />
        </div>
      default:
        return <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>
    }
  }

  const getMessageForErrorCode = (code?: number) => {
    switch (code) {
      case 401:
        return `For security purposes, you will need to log in again.`
      case 403:
        return `You do not have the permission to access this area or perform this action.`
      default:
        return `We're so sorry, something has gone really wrong.`
    }
  }

  return <>
    {/* Global notification live region, render this permanently at the end of the document */}
    { error ? <div className="fixed inset-0 w-screen h-screen flex flex-col justify-center sm:items-center bg-white z-50">
      <div className="m-8 sm:m-0 sm:-mt-8 w-full max-w-xl">
        { getIconForErrorCode(error.code) }
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-4xl font-bold tracking-tight text-gray-900">
            { getMessageForErrorCode(error.code) }
          </h3>
          <div className="my-5">
            { error.code === 401
              ? null 
              : <Error error={error} eventId={eventId} /> }
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
      { error.code === 401
        ? <Spinner /> 
        : <Button onClick={() => {
          clearError();
          history.push('/')
        } }>Go to homepage</Button> }
      </div>
    </div> : null}
  </>;
}

export default ErrorHandler;