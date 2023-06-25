import { FC } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export interface ErrorProps {
  error: {
    message: string;
    code?: number;
  };
  eventId?: string;
}

const Error: FC<ErrorProps> = ({ error, eventId }) => {
  const { message, code } = error;
  const isSevere = !code || code.toString().startsWith('5');
  return (
    <div className={`rounded-md ${isSevere ? 'bg-red-50' : 'bg-orange-100'} p-2 mb-4 text-left`}>
      <div>
        <div className="flex m-4">
          <div className="flex-shrink-0">
            <FiAlertTriangle
              className={`h-5 w-5 mr-2 ${isSevere ? 'text-red-600' : 'text-orange-500'} `}
              aria-hidden="true"
            />
          </div>
          <p className={`text-sm ${isSevere ? 'text-red-700' : 'text-orange-600'}`}>
            If this continues to occur please contact GoodHub support. To help solve your problem fast, please include
            the information below.
          </p>
        </div>
        <div className="m-4">
          <div className="text-sm text-gray-600">
            <ul className="space-y-1">
              <li>
                <span className="font-bold">Message:</span> {message}
              </li>
              {eventId ? (
                <li>
                  <span className="font-bold">Error ID:</span> {eventId}
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
