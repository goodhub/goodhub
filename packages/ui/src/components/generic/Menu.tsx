import { FC } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../translations/Navigation';

export interface MenuProps {
  navigation?: {
    name: string
    to: string
    icon: FC<{className: string}>
  }[]
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Menu: FC<MenuProps> = ({ navigation = [] }) => {

  return <nav className="space-y-1" aria-label="Sidebar">
  {navigation.map((item) => (
    <Link
      key={item.name}
      to={item.to}
      className={classNames(
        false ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
      )}
      aria-current={false ? 'page' : undefined}
    >
      <item.icon
        className={classNames(
          false ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
        )}
        aria-hidden="true"
      />
      <span className="truncate">{item.name}</span>
    </Link>
  ))}
  <div className="md:hidden flex-col p-3">
    <Link to="/organisations/82495473-b6ae-4e14-a877-bf831dbba1f1">
      <p className="text-gray-700 dark:text-white text-sm mb-5">{Navigation.menu.aboutGoodHub}</p>
    </Link>
    <Link to="/info/privacy">
      <p className="text-gray-700 dark:text-white text-sm mb-5">{Navigation.menu.privacyPolicy}</p>
    </Link>
  </div>
</nav>
}

export default Menu;