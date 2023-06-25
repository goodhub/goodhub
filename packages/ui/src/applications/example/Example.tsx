/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';
import { FiSettings, FiWind } from 'react-icons/fi';
import { ApplicationConfig, useApplication } from '../../services/application-service';
import Button from '../../components/generic/Button';

const Example: FC = () => {
  const { person, client } = useApplication('example');
  const { data } = client.example.info.useQuery({ userId: 1 });

  const echo = client.example.echo.useMutation();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-semibold">Example</h1>
      <div className="p-6 flex flex-col justify-center gap-4">
        <p>{person?.firstName}</p>
        <p>{data?.description}</p>
        <Button mode="plain" onClick={() => echo.mutate({ message: 'Hello world!' })}>
          Echo
        </Button>
      </div>
    </div>
  );
};

const App: ApplicationConfig = {
  name: 'Example',
  stage: 'Development',
  audience: 'Organisation',
  // Navigation is a list of links that will be rendered in the sidebar
  navigation: [
    {
      name: 'Example',
      path: '/dashboard/:organisationId/example',
      icon: FiSettings,
      children: [
        {
          name: 'Breakout',
          path: '/example/breakout',
          icon: FiWind
        }
      ]
    }
  ],

  // Routes are the actual routes that will be rendered in the application
  routes: {
    // These routes will be rendered inside the main application frame
    dashboard: [{ path: '/dashboard/:organisationId/example', element: <Example /> }],
    // These routes will be rendered as a standalone page with no frame
    standalone: [{ path: '/example/breakout', element: <p>This is a standalone page</p> }]
  }
};

export default App;
