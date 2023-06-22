import { FC, useEffect, useState, Suspense } from "react";
import {
  Router,
  Route as AnonymousRoute,
  Switch,
  Link,
} from "react-router-dom";

import { History } from "history";

import Spinner from "../components/generic/Spinner";
import { BackstageProvider } from "../helpers/BackstageProvider";
import AuthenticatedRoute from "../components/authentication/AuthenticatedRoute";
import Login from "../components/authentication/Login";
import Logout from "../components/authentication/Logout";
import Redirect from "../components/authentication/Redirect";
import Header from "../components/header/Header";
import Me from "../components/me/Me";
import Onboarding from "../components/onboarding/Onboarding";
import StandardRoute from "../components/authentication/StandardRoute";
import Feed from "../components/posts/Feed";
import UnderConstruction from "../components/generic/UnderConstruction";
import Personal from "./Personal";
import Organisational from "./Organisational";
import Team from "../components/dashboard/team/Team";
import Projects from "../components/dashboard/projects/Projects";
import OrganisationFeed from "../components/dashboard/OrganisationFeed";
import ErrorHandler from "../components/errors-and-notifications/ErrorHandler";
import Invite from "../components/authentication/Invite";
import OrganisationSettings from "../components/dashboard/organisation-configuration/OrganisationSettings";
import NotificationHandler from "../components/errors-and-notifications/NotificationHandler";
import Project from "../components/dashboard/projects/Project";
import Conversations from "../components/conversations/Conversations";
import Conversation from "../components/conversations/Conversation";
// import Volunteers from '../components/dashboard/Volunteers';
import OrganisationProfile from "../components/organisation/OrganisationProfile";
import Following from "../components/me/Following";
import Menu, { MenuProps } from "../components/generic/Menu";
import WebsiteSettings from "../components/dashboard/website/WebsiteSettings";
import Graphic from "../components/decoration/Graphic";
import Navigation from "../translations/Navigation";
import PrivacyPolicy from "../components/info/PrivacyPolicy";

import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../../api/src/routers/trpc/adapter";
export const trpc = createTRPCReact<AppRouter>();

const Main: FC<{ history: History }> = ({ history }) => {
  const [mainMenu, setMainMenu] = useState<MenuProps>();

  useEffect(() => {
    const mint = {
      50: "#F7FBF9",
      100: "#CFFDF4",
      200: "#cfece7",
      300: "#91ECDA",
      400: "#50C7B0",
      500: "#47B19D",
      600: "#3F9E8C",
      700: "#2F7B6D",
      800: "#215A4F",
      900: "#12332D",
    };

    const root = window.document.documentElement;
    root.style.setProperty("--color-primary-50", mint["50"]);
    root.style.setProperty("--color-primary-100", mint["100"]);
    root.style.setProperty("--color-primary-200", mint["200"]);
    root.style.setProperty("--color-primary-300", mint["300"]);
    root.style.setProperty("--color-primary-400", mint["400"]);
    root.style.setProperty("--color-primary-500", mint["500"]);
    root.style.setProperty("--color-primary-600", mint["600"]);
    root.style.setProperty("--color-primary-700", mint["700"]);
    root.style.setProperty("--color-primary-800", mint["800"]);
    root.style.setProperty("--color-primary-900", mint["900"]);
    root.style.setProperty("--color-primary-appropriate", "rgb(0,0,0)");
  }, []);

  const a = trpc.example.info.useQuery({ userId: 1 });

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
          <main className="min-h-screen w-screen flex flex-col">
            <Switch>
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
                <Header menu={mainMenu}></Header>
                <div className="max-w-7xl w-full mx-auto px-2 pt-20 sm:pt-22 sm:px-4 lg:px-8">
                  <ErrorHandler />
                  <NotificationHandler />
                  <div className="flex flex-col md:flex-row">
                    <div className="hidden md:flex md:w-48 flex-col md:mr-8 flex-shrink-0">
                      <Menu {...mainMenu} />
                      <div className="hidden md:flex flex-col p-3">
                        <a
                          href="http://goodhub.org.uk"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {a.data?.description}
                          <p className="text-gray-700 dark:text-white text-sm mb-5">
                            {Navigation.menu.aboutGoodHub}
                          </p>
                        </a>
                        <Link to="/info/privacy">
                          <p className="text-gray-700 dark:text-white text-sm mb-5">
                            {Navigation.menu.privacyPolicy}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <Switch>
                      <AuthenticatedRoute path="/dashboard/:organisationId?">
                        <Organisational setMainMenu={setMainMenu}>
                          <Switch>
                            <AuthenticatedRoute path="/dashboard/:organisationId/settings">
                              <OrganisationSettings />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/dashboard/:organisationId/fundraising">
                              <UnderConstruction />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/dashboard/:organisationId/volunteers">
                              {/* <Volunteers /> */}
                              <UnderConstruction />
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
                            <AuthenticatedRoute path="/dashboard/:organisationId/conversations">
                              <UnderConstruction />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/dashboard/:organisationId?">
                              <OrganisationFeed />
                            </AuthenticatedRoute>
                          </Switch>
                        </Organisational>
                      </AuthenticatedRoute>

                      <Switch>
                        <Personal setMainMenu={setMainMenu}>
                          <Switch>
                            <AnonymousRoute path="/info/privacy">
                              <PrivacyPolicy />
                            </AnonymousRoute>
                            <AuthenticatedRoute path="/settings">
                              <Me />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/volunteering">
                              <UnderConstruction />
                            </AuthenticatedRoute>
                            <StandardRoute path="/organisations/:organisationId">
                              <OrganisationProfile />
                            </StandardRoute>
                            <AuthenticatedRoute path="/following">
                              <Following />
                            </AuthenticatedRoute>
                            <StandardRoute path="/conversations/:postId">
                              <Conversation />
                            </StandardRoute>
                            <StandardRoute path="/conversations">
                              <Conversations />
                            </StandardRoute>
                            <StandardRoute path="/">
                              <Feed />
                            </StandardRoute>
                          </Switch>
                        </Personal>
                      </Switch>
                    </Switch>
                  </div>
                </div>
              </AnonymousRoute>
            </Switch>
          </main>
        </BackstageProvider>
      </Suspense>
    </Router>
  );
};

export default Main;
