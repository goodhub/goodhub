import React, { ReactNode } from 'react';
import Button, { ButtonStyle } from './Button';
import Card from './Card';
import Spinner from './Spinner';
import Title from './Title';

export interface Action {
  name: ReactNode | string
  onClick: () => void
  mode?: ButtonStyle
}

type PageProps = {
  actions: Action[]
  title: string,
  loading?: boolean
}


const Page: React.FC<PageProps> = ({ children, title, actions, loading }) => {

  return <div className="flex-1 flex flex-col pb-5 relative">
    { loading ? <div className="absolute inset-0 w-full h-full flex flex-col justify-center sm:items-center z-50">
      <Spinner />
    </div> : null }
    <div className={loading ? 'opacity-25 pointer-events-none' : ''}>
      <div className="flex justify-between mt-2 mb-6 mx-3 md:mx-0">
        <Title>{title}</Title>
        <div className="flex">
          {actions.length < 3 ? actions.map((a, i) => <Button className={`${i === (actions.length - 1) ? 'mr-0' : 'mr-4'}`} onClick={a.onClick} mode={a.mode ? a.mode : 'primary'}>{a.name}</Button>) : null}
        </div>
      </div>
      {actions.length >= 3 ? <div className="flex">
        <div className="flex-grow mr-4">
          {children}
        </div>
        <Card className="min-w-max-content h-fit-content space-y-1 overflow-hidden" aria-label="Sidebar">
          <div className="py-4 px-5 w-full bg-white border-b border-gray-200">
            <h1 className="text-lg leading-6 font-medium text-primary-700">Actions</h1>
          </div>
          <div className="p-2">
            {actions.map((a) => (
              <button key={a.name?.toString()} onClick={a.onClick} className="text-gray-600 w-full hover:bg-gray-50 hover:text-gray-900 group flex items-center px-4 py-2 text-sm font-medium rounded-md">
                { a.name }
              </button>
            ))}
          </div>
        </Card>
      </div> : children}
    </div>
  </div>;
}

export default Page;