import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { createBrowserHistory } from 'history';

import './index.css';
import { getSetting } from './helpers/backstage';
import { getBaseURL } from './services/authentication-service';

const history = createBrowserHistory();


(async () => {
  const dsn = await getSetting('auth:sentry:ui_dsn');
  const environmentName = process.env.REACT_ENV_ENVIRONMENT_NAME || process.env.NODE_ENV;

  const baseUrl = await getBaseURL();
  if (!baseUrl) throw Error('Backstage is not configured correctly');

  const domain = baseUrl.match(/\/\/(.*)\//)?.[1];
  if (!domain) throw Error('Backstage is not configured correctly');
  
  const tracingOrigins = [
    'localhost', 
    domain,
    'goodhub-development-functions.azurewebsites.net',
    /^\//
  ]
  
  Sentry.init({ 
    dsn,
    environment: process.env.NODE_ENV === 'production' ? environmentName : 'local',
    tracesSampleRate: 1.0,
    autoSessionTracking: true,
    ignoreErrors: [ 'ResizeObserver' ],
    integrations: [new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      tracingOrigins: tracingOrigins
    })],
    beforeBreadcrumb: (breadcrumb, hint) => {
      if (breadcrumb.category?.startsWith('ui')) {
        const target = hint?.event.target as HTMLElement;
        const label = target.getAttribute('aria-label');

        if (!label) {
          return null;
        }

        breadcrumb.message = `${label?.toLowerCase()}[sentry="${label}"]`;
        return breadcrumb;
      }

      return breadcrumb;
    }
  });

  const App = (() => {
    if (process.env.REACT_APP_BUILD_TARGET === 'main') { 
      return loadable(() => import('./main/Main'))
    } else if (process.env.REACT_APP_BUILD_TARGET === 'external') { 
      return loadable(() => import('./external/External')) 
    } else { 
      throw new Error("No such build target: " + process.env.REACT_APP_BUILD_TARGET) 
    } 
  })()
  
  ReactDOM.render(
    <React.StrictMode>
      <App history={history}/>
    </React.StrictMode>,
    document.getElementById('root')
  );

})()