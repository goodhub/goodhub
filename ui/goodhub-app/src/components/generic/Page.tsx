import React, { ReactNode } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link, LinkProps } from 'react-router-dom';
import Button, { ButtonStyle } from './Button';
import Card from './Card';
import Spinner from './Spinner';
import Title from './Title';

export interface Action {
  name: ReactNode | string
  onClick: () => void
  mode?: ButtonStyle
}

export enum PageBehaviour {
  Basic,
  Form
}

type PageProps = {
  title?: ReactNode
  actions?: Action[]
  back?: LinkProps & { title: string }
  loading?: boolean
  behaviour?: PageBehaviour
}


const Page: React.FC<PageProps> = ({ children, title, actions = [], loading, back, behaviour = PageBehaviour.Basic }) => {

  return <div className="flex-1 flex flex-col pb-5 relative text-gray-800">
    {loading ? <div className="absolute inset-0 w-full h-full flex flex-col justify-center sm:items-center z-50">
      <Spinner />
    </div> : null}
    <div>
      <div className="flex justify-between mt-2 mb-3 mx-3 md:mx-0">
        <div>
          { back ? <Link {...back} className="-ml-1 mb-2 inline-flex items-center space-x-1 text-sm font-medium text-gray-900">
            <FiChevronLeft className="h-5 w-5" />
            <span>{ back.title }</span>
          </Link> : null }
          { title ? typeof title === 'string' ? <Title>{title}</Title> : title : null }
        </div>
        <div className="flex self-end">
          {actions.length < 3 ? actions.map((a, i) => <Button className={`${i === (actions.length - 1) ? 'mr-0' : 'mr-4'}`} onClick={a.onClick} mode={a.mode ? a.mode : 'primary'}>{a.name}</Button>) : null}
        </div>
      </div>
      {actions.length >= 3 ? <div className="flex">
        <div className="flex-grow">
          {children}
        </div>
        <Card className="min-w-max-content h-fit-content space-y-1 overflow-hidden ml-4 hidden sm:block" aria-label="Sidebar">
          <div className="p-2">
            {actions.map((a) => (
              <button key={a.name?.toString()} onClick={a.onClick} className="text-gray-600 w-full hover:bg-gray-50 hover:text-gray-900 group flex items-center px-4 py-2 text-sm font-medium rounded-md">
                { a.name}
              </button>
            ))}
          </div>
        </Card>
      </div> : <span className={loading ? 'opacity-25 pointer-events-none' : ''}> {children} </span>}
      { behaviour === PageBehaviour.Form && ((actions && actions.length) || loading) ? <Card className="p-4 sm:shadow-lg mt-5 sticky bottom-0 flex items-center justify-between">
        <div>
          { loading ? <Spinner size="8" /> : null }
        </div>
        <div className="flex">
          {actions.map((a, i) => <Button className={`${i === (actions.length - 1) ? 'mr-0' : 'mr-4'}`} onClick={a.onClick} mode={a.mode ? a.mode : 'primary'}>{a.name}</Button>)}
        </div>
      </Card> : null }
    </div>
  </div>;
}

export default Page;