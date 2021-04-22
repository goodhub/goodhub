import { FC } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export interface ErrorProps {
  message: string
  eventId?: string
}

const Error: FC<ErrorProps> = ({ message, eventId }) => {
  return <div className="rounded-md bg-red-50 p-2 mb-4 text-left">
    <div>
      <div className="flex m-4">
        <div className="flex-shrink-0">
          <FiAlertTriangle className="h-5 w-5 mr-2 text-red-600" aria-hidden="true" />
        </div>
        <p className="text-sm text-red-700">If this continues to occur please contact GoodHub support. To help solve your problem fast, please include the information below.</p>
      </div>
      <div className="m-4">
        <div className="text-sm text-gray-600">
          <ul className="space-y-1">
            <li><span className="font-bold">Message:</span> {message}</li>
            {eventId ? <li><span className="font-bold">Error ID:</span> {eventId}</li> : null}
          </ul>
        </div>
      </div>
    </div>
  </div>;
}

export default Error;