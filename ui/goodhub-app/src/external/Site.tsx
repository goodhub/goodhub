import { FC, useEffect, useState } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { IWebsiteConfiguration } from '@strawberrylemonade/goodhub-lib';

import { TiWarningOutline } from 'react-icons/ti';

import { getWebsiteConfiguration } from '../services/website-service';
import Spinner from '../components/generic/Spinner';
import Banner from '../components/website/Banner';
import Header from '../components/website/Header';
import Hero from '../components/website/Hero';
import ExternalLinks from '../components/website/ExternalLinks';
import PostList from '../components/website/PostList';
import Footer from '../components/website/Footer';
import About from './About';

const calcColorContrast = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140
    ? 'rgb(0,0,0)'
    : 'rgb(255,255,255)'
}

interface SiteRouteParams {
  organisationId?: string
}

const Site: FC = () => {

  const [config, setConfig] = useState<IWebsiteConfiguration>();

  const { organisationId } = useParams<SiteRouteParams>()

  useEffect(() => {
    (async () => {
      if (config) return;

      const lookup = (() => {
        if (process.env.REACT_APP_ORGANISATION) return process.env.REACT_APP_ORGANISATION;
        if (organisationId) return organisationId;
        return window.location.hostname;
      })()

      const response = await getWebsiteConfiguration(lookup);
      const root = window.document.documentElement;

      const [h, s, l] = response.primaryColor.hsl;
      root.style.setProperty('--color-primary', `hsl(${h},${s}%,${l}%)`);
      root.style.setProperty('--color-primary-light', `hsl(${h},${s}%,70%)`);
      root.style.setProperty('--color-primary-dark', `hsl(${h},${s}%,30%)`);

      root.style.setProperty('--color-primary-appropriate', calcColorContrast(response.primaryColor.rgb));

      root.style.setProperty('--color-secondary', response.secondaryColor.hex);
      root.style.setProperty('--color-secondary-appropriate', calcColorContrast(response.secondaryColor.rgb));
      setConfig(response);
    })()
  }, [organisationId, config, setConfig])

  const match = useRouteMatch();

  return config
    ? <div className="flex flex-col w-screen min-h-screen">
      {!config.verified ? <Banner mode="warning" message={<>
        <span className="flex text-white">
          <TiWarningOutline className="h-6 w-6 mr-1" />
              This organisation has not been verified.
              <a className="ml-1 italic cursor-pointer" href="https://docs.goodhub.org.uk/organisations/verification" target="_blank" rel="noreferrer">Click to learn more.</a>
        </span>
      </>} /> : null}
      {config.alert ? <Banner message={config.alert} /> : null}
      <Header config={config} />
      <Switch>
        <Route path={`${match.path}/about`}>
          <About about={config.about} />
        </Route>
        <Route path={`${match.path}`}>
          {config.hero ? <Hero hero={config.hero} /> : null}
          {/* <FeaturedProjects /> */}
          <PostList orgId={config.id} />
          {config.externalLinks ? <ExternalLinks links={config.externalLinks} /> : null}
        </Route>
      </Switch>
      <Footer />
    </div>
    : <div className="flex justify-center items-center h-screen">
      <Spinner size="12" />
    </div>
}

export default Site;
