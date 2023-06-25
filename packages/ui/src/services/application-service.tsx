import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { AppRouter } from '../../../api/src/routers/trpc/adapter';
import { FC, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useVariable } from '@softwareimaging/backstage';
import { Variables } from '../helpers/backstage-config';
import { IconType } from 'react-icons/lib';
import { usePersonService } from './person-service';
import { useOrganisationService } from './organisation-service';

export const trpc = createTRPCReact<AppRouter>();
export const ApplicationService: FC = ({ children }) => {
  const baseUrl = useVariable<Variables>('connections:core:base_url');
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {};
          }
        })
      ]
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export interface NavigationObject {
  path: string;
  name: string;
  icon: IconType;
  children?: NavigationObject[];
}

interface RouteObject {
  path: string;
  element: ReactNode;
}

export interface ApplicationConfig {
  name: string;
  stage: 'GeneralAvailability' | 'Experiment' | 'Development';
  audience: 'Organisation' | 'Person';
  navigation: NavigationObject[];
  routes: {
    dashboard: RouteObject[];
    standalone?: RouteObject[];
  };
}

export const useApplication = (id: string) => {
  const person = usePersonService(state => state.person);
  const organisation = useOrganisationService(state => state.organisation);
  return { person, organisation, client: trpc };
};
