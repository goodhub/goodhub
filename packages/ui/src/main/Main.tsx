import { FC, Suspense } from 'react';
import { Router, Route as AnonymousRoute, Switch, Link } from 'react-router-dom';

import { History } from 'history';

import Spinner from '../components/generic/Spinner';
import { BackstageProvider } from '../helpers/BackstageProvider';
import AuthenticatedRoute from '../components/authentication/AuthenticatedRoute';
import Login from '../components/authentication/Login';
import Logout from '../components/authentication/Logout';
import Redirect from '../components/authentication/Redirect';
import Header from '../components/header/Header';
import Onboarding from '../components/onboarding/Onboarding';
import StandardRoute from '../components/authentication/StandardRoute';
import Feed from '../components/posts/Feed';
import Organisational from './Organisational';
import Team from '../components/dashboard/team/Team';
import Projects from '../components/dashboard/projects/Projects';
import OrganisationFeed from '../components/dashboard/OrganisationFeed';
import ErrorHandler from '../components/errors-and-notifications/ErrorHandler';
import Invite from '../components/authentication/Invite';
import OrganisationSettings from '../components/dashboard/organisation-configuration/OrganisationSettings';
import NotificationHandler from '../components/errors-and-notifications/NotificationHandler';
import Project from '../components/dashboard/projects/Project';
import { Navigation } from '../components/navigation/Navigation';
import WebsiteSettings from '../components/dashboard/website/WebsiteSettings';
import Graphic from '../components/decoration/Graphic';
import NavigationTranslation from '../translations/Navigation';
import PrivacyPolicy from '../components/info/PrivacyPolicy';
import { ApplicationService } from '../services/application-service';
import { generateDashboardRoutes, generateStandaloneRoutes } from '../applications';
import { ThemeManager } from '../services/hooks/theme';

const Main: FC<{ history: History }> = ({ history }) => {
  return (
    <Router history={history}>
      <Suspense
        fallback={
          <main className="h-screen w-screen flex justify-center items-center">
            <Spinner />
          </main>
        }
      >
        <BackstageProvider>
          <ApplicationService>
            <ThemeManager>
              <main className="min-h-screen w-screen flex flex-col">
                <Switch>
                  {generateStandaloneRoutes()}
                  <StandardRoute path="/me/invite/:id">
                    <Invite />
                  </StandardRoute>
                  <AnonymousRoute path="/me/onboarding">
                    <Onboarding></Onboarding>
                  </AnonymousRoute>
                  <AnonymousRoute path="/me/login">
                    <Login></Login>
                  </AnonymousRoute>
                  <AnonymousRoute path="/me/logout">
                    <Logout></Logout>
                  </AnonymousRoute>
                  <AnonymousRoute path="/me/redirect">
                    <Redirect></Redirect>
                  </AnonymousRoute>
                  <AnonymousRoute path="/graphics">
                    <Graphic />
                  </AnonymousRoute>
                  <AnonymousRoute>
                    <Header />
                    <div className="max-w-7xl w-full mx-auto px-2 pt-20 sm:pt-22 sm:px-4 lg:px-8">
                      <ErrorHandler />
                      <NotificationHandler />
                      <div className="flex flex-col md:flex-row">
                        <div className="hidden md:flex md:w-56 flex-col md:mr-6 flex-shrink-0">
                          <Navigation />
                          <div className="hidden md:flex flex-col p-3">
                            <a href="http://goodhub.org.uk" target="_blank" rel="noreferrer">
                              <p className="text-gray-700 dark:text-white text-sm mb-5">
                                {NavigationTranslation.menu.aboutGoodHub}
                              </p>
                            </a>
                            <Link to="/info/privacy">
                              <p className="text-gray-700 dark:text-white text-sm mb-5">
                                {NavigationTranslation.menu.privacyPolicy}
                              </p>
                            </Link>
                          </div>
                        </div>
                        <Switch>
                          <AuthenticatedRoute path="/dashboard/:organisationId">
                            <Organisational>
                              <Switch>
                                <AuthenticatedRoute path="/dashboard/:organisationId/settings">
                                  <OrganisationSettings />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute path="/dashboard/:organisationId/website">
                                  <WebsiteSettings />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute path="/dashboard/:organisationId/team">
                                  <Team />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute path="/dashboard/:organisationId/projects/:projectId">
                                  <Project />
                                </AuthenticatedRoute>
                                <AuthenticatedRoute path="/dashboard/:organisationId/projects">
                                  <Projects />
                                </AuthenticatedRoute>
                                {generateDashboardRoutes()}
                                <AuthenticatedRoute path="/dashboard/:organisationId">
                                  <OrganisationFeed />
                                </AuthenticatedRoute>
                              </Switch>
                            </Organisational>
                          </AuthenticatedRoute>

                          <Switch>
                            <AnonymousRoute path="/info/privacy">
                              <PrivacyPolicy />
                            </AnonymousRoute>
                            <StandardRoute path="/">
                              <Feed />
                            </StandardRoute>
                          </Switch>
                        </Switch>
                      </div>
                    </div>
                  </AnonymousRoute>
                </Switch>
              </main>
            </ThemeManager>
          </ApplicationService>
        </BackstageProvider>
      </Suspense>
    </Router>
  );
};

export default Main;
