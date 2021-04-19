import { FC, useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';

import { TiWarningOutline } from 'react-icons/ti';

import { getWebsiteConfiguration, useWebsiteService, WebsiteState } from '../services/website-service';
import Spinner from '../components/generic/Spinner';
import Banner from '../components/website/Banner';
import Header from '../components/website/Header';
import Hero from '../components/website/Hero';
import ExternalLinks from '../components/website/ExternalLinks';
import PostList from '../components/website/PostList';
import Footer from '../components/website/Footer';
import About from './About';
import Project from './Project';

interface SiteRouteParams {
  organisationId?: string
}

const Site: FC = () => {

  const { state, config, setWebsiteConfig, setWebsiteLookupLoading } = useWebsiteService();

  const { organisationId } = useParams<SiteRouteParams>()

  useEffect(() => {
    (async () => {
      if (config) return;

      const lookup = (() => {
        if (process.env.REACT_APP_ORGANISATION) return process.env.REACT_APP_ORGANISATION;
        if (organisationId) return organisationId;
        return window.location.hostname;
      })()

      setWebsiteLookupLoading()
      const response = await getWebsiteConfiguration(lookup);
      setWebsiteConfig(response);
    })()
  }, [organisationId, config, setWebsiteConfig, setWebsiteLookupLoading])

  const match = useRouteMatch();

  return state === WebsiteState.Identified && config
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
        <Route path={`${match.path}/projects/:projectId`}>
          <Project />
        </Route>
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
    : state === WebsiteState.Loading
    ? <div className="flex justify-center items-center h-screen">
        <Spinner size="12" />
      </div>
    : null
}

export default Site;
