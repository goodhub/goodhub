import { FC, useMemo } from 'react';
import Card from '../generic/Card';
import { OrganisationSwitcher } from './OrganisationSwitcher';
import { Link } from 'react-router-dom';
import Translations from '../../translations/Navigation';
import { RiFolderTransferFill, RiSettings4Fill, RiTeamFill, RiWindow2Fill } from 'react-icons/ri';
import { useOrganisationService } from '../../services/organisation-service';
import { TiHome } from 'react-icons/ti';
import { FiGlobe } from 'react-icons/fi';
import { generateOrganisationalApplicationNavigation, generatePersonalApplicationNavigation } from '../../applications';

import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

export const Navigation: FC = () => {
  const organisation = useOrganisationService(state => state.organisation);
  const organisationId = organisation?.id;
  const navigation = useMemo(() => {
    const items = [];
    items.push({
      name: 'News',
      to: '/',
      icon: FiGlobe
    });
    items.push(...generatePersonalApplicationNavigation());

    if (organisationId) {
      items.push(
        ...[
          { name: Translations.menu.feed, to: `/dashboard/${organisationId}`, icon: TiHome },
          { name: Translations.menu.website, to: `/dashboard/${organisationId}/website`, icon: RiWindow2Fill },
          { name: Translations.menu.projects, to: `/dashboard/${organisationId}/projects`, icon: RiFolderTransferFill },
          { name: Translations.menu.team, to: `/dashboard/${organisationId}/team`, icon: RiTeamFill },
          ...generateOrganisationalApplicationNavigation(organisationId),
          { name: Translations.menu.settings, to: `/dashboard/${organisationId}/settings`, icon: RiSettings4Fill }
        ]
      );
    }
    return items;
  }, [organisationId]);

  const [ref, { height }] = useMeasure();

  return (
    <div className="bg-white shadow-sm sm:rounded-lg border border-gray-200">
      <div className="flex flex-col gap-2 pt-4 pb-2">
        <div className="px-4">
          <OrganisationSwitcher />
        </div>
        <motion.div
          className="px-2 overflow-clip"
          animate={{ height: height > 0 ? height : undefined }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        >
          <div ref={ref} className="flex flex-col">
            {navigation.map(({ name, to, icon: Icon }) => (
              <Link key={name} to={to} className="p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                <Icon className="inline-block mr-2" />
                {name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
