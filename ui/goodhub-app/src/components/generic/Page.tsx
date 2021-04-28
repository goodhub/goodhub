import React, { ReactNode } from 'react';
import Button from './Button';
import Card from './Card';
import Title from './Title';

interface Action {
  name: ReactNode | string
  onClick: () => void
}

type PageProps = {
  actions: Action[]
  title: string
}


const Page: React.FC<PageProps> = ({ children, title, actions }) => {

  return <div className="flex-1 flex flex-col">
    <div className="flex justify-between mt-2 mb-6 mx-3 md:mx-0">
      <Title>{title}</Title>
      <div className="flex">
        {actions.length < 3 ? actions.map((a, i) => <Button className={`${i === (actions.length - 1) ? 'mr-0' : 'mr-4'}`} onClick={a.onClick} mode="primary">{a.name}</Button>) : null}
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
  </div>;
}

export default Page;