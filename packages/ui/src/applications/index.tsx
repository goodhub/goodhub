import StandardRoute from '../components/authentication/StandardRoute';
import { ApplicationConfig } from '../services/application-service';
import Example from './example/Example';
export const Applications: ApplicationConfig[] = [Example];

export const generateDashboardRoutes = () => {
  return Applications.flat()
    .map(app => app.routes.dashboard ?? [])
    .flat()
    .map(({ path, element }) => {
      return (
        <StandardRoute key={path} path={path}>
          {element}
        </StandardRoute>
      );
    });
};

export const generateStandaloneRoutes = () => {
  return Applications.map(app => app.routes.standalone ?? [])
    .flat()
    .map(({ path, element }) => {
      return (
        <StandardRoute key={path} path={path}>
          {element}
        </StandardRoute>
      );
    });
};

export const generatePersonalApplicationNavigation = () => {
  return Applications.filter(app => app.audience === 'Person')
    .map(app => app.navigation)
    .flat()
    .map(({ name, path, icon }) => {
      return { name, to: path, icon };
    });
};

export const generateOrganisationalApplicationNavigation = (id: string) => {
  return Applications.filter(app => app.audience === 'Organisation')
    .map(app => app.navigation)
    .flat()
    .map(({ name, path, icon }) => {
      return { name, to: path.replace(':organisationId', id), icon };
    });
};
