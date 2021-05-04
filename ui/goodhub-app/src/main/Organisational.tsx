import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TiHome } from 'react-icons/ti';
import { RiSettings4Fill, RiTeamFill, RiFolder2Fill, RiWindow2Fill, RiMoneyPoundBoxFill } from 'react-icons/ri';
import { MdForum } from 'react-icons/md';

import { getExtendedOrganisation, getProjectsForOrganisation, useOrganisationService } from '../services/organisation-service';
import Menu from '../components/generic/Menu';
import Spinner from '../components/generic/Spinner';
import Navigation from '../translations/Navigation';
import { useErrorService } from '../services/error-service';
import Card from '../components/generic/Card';

const GhVolunteer: FC<{ className: string }> = ({ className }) => (
  <svg className={className} width="22" height="18" viewBox="0 0 22 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.95448 3.7985C5.81594 3.7985 6.51487 3.09958 6.51487 2.23812C6.51487 1.37666 5.81594 0.677734 4.95448 0.677734C4.09302 0.677734 3.3941 1.37666 3.3941 2.23812C3.3941 3.09958 4.09302 3.7985 4.95448 3.7985ZM17.4376 3.7985C18.299 3.7985 18.9979 3.09958 18.9979 2.23812C18.9979 1.37666 18.299 0.677734 17.4376 0.677734C16.5761 0.677734 15.8772 1.37666 15.8772 2.23812C15.8772 3.09958 16.5761 3.7985 17.4376 3.7985ZM21.5238 15.8947L20.0935 12.3189L18.7574 13.8272L18.6924 14.4189L19.5928 16.6684C19.7554 17.0748 20.1455 17.3218 20.5583 17.3218C20.6884 17.3218 20.8184 17.2991 20.9452 17.2471C21.4783 17.0325 21.7384 16.4279 21.5238 15.8947ZM20.412 9.07455L19.8106 6.46741C19.6611 5.81725 19.206 5.27112 18.5916 5.0078C17.9902 4.74774 17.3238 4.79 16.7679 5.11508C16.03 5.55069 15.4773 6.2366 15.2043 7.04605L14.8369 8.14808L14.3168 8.47966V5.35889C14.3168 5.07282 14.0827 4.83876 13.7967 4.83876H8.59538C8.30931 4.83876 8.07525 5.07282 8.07525 5.35889V8.47966L7.55187 8.14808L7.18453 7.04605C6.91472 6.23335 6.35883 5.55069 5.6209 5.11508C5.06176 4.79 4.39859 4.74774 3.7972 5.0078C3.18279 5.27112 2.72768 5.81725 2.57815 6.46741L1.98 9.07455C1.83046 9.72471 2.00275 10.4139 2.44811 10.9178L4.63265 13.3851L4.96098 16.3954C5.0195 16.9252 5.46811 17.3218 5.99474 17.3218C6.03375 17.3218 6.06951 17.3186 6.10852 17.3153C6.68066 17.2536 7.09026 16.7399 7.02849 16.1678L6.70016 13.1511C6.6514 12.7285 6.47586 12.3351 6.19304 12.0133L4.78544 10.4204L5.35758 8.13507L5.57864 8.79824C5.71192 9.20459 5.96548 9.55892 6.37508 9.858L8.03624 10.9145C8.18578 11.0088 8.42959 11.064 8.59538 11.077H13.7967C13.9625 11.064 14.2063 11.0088 14.3558 10.9145L16.017 9.858C16.4266 9.55892 16.6801 9.20784 16.8134 8.79824L17.0345 8.13507L17.6066 10.4204L16.199 12.0133C15.9162 12.3351 15.7406 12.7285 15.6919 13.1511L15.3635 16.1678C15.3018 16.7399 15.7146 17.2536 16.2835 17.3153C16.3225 17.3186 16.3583 17.3218 16.3973 17.3218C16.9207 17.3218 17.3725 16.9285 17.4311 16.3954L17.7594 13.3851L19.9439 10.9178C20.386 10.4139 20.5616 9.72471 20.412 9.07455ZM2.29858 12.3189L0.868224 15.8947C0.653671 16.4279 0.913735 17.0325 1.44687 17.2471C1.993 17.4616 2.5879 17.1918 2.7992 16.6684L3.69967 14.4189L3.63466 13.8272L2.29858 12.3189Z" />
  </svg>
)

export interface OrganisationalProps { }

function hexToHSL(H: string) {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = Number("0x" + H[1] + H[1]);
    g = Number("0x" + H[2] + H[2]);
    b = Number("0x" + H[3] + H[3]);
  } else if (H.length === 7) {
    r = Number("0x" + H[1] + H[2]);
    g = Number("0x" + H[3] + H[4]);
    b = Number("0x" + H[5] + H[6]);
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

const Organisational: FC<OrganisationalProps> = ({ children }) => {

  interface OrganisationalDashboardParams {
    organisationId?: string
  }

  const [organisation, setOrganisation] = useOrganisationService(state => [state.organisation, state.setOrganisation]);
  const setError = useErrorService(state => state.setError);
  const { organisationId } = useParams<OrganisationalDashboardParams>()

  const navigation = [
    { name: Navigation.menu.feed, to: `/dashboard/${organisationId}`, icon: TiHome },
    { name: Navigation.menu.conversations, to: `/dashboard/${organisationId}/conversations`, icon: MdForum },
    { name: Navigation.menu.projects, to: `/dashboard/${organisationId}/projects`, icon: RiFolder2Fill },
    { name: Navigation.menu.team, to: `/dashboard/${organisationId}/team`, icon: RiTeamFill },
    { name: Navigation.menu.website, to: `/dashboard/${organisationId}/website`, icon: RiWindow2Fill },
    { name: Navigation.menu.volunteers, to: `/dashboard/${organisationId}/volunteers`, icon: GhVolunteer },
    { name: Navigation.menu.fundraising, to: `/dashboard/${organisationId}/fundraising`, icon: RiMoneyPoundBoxFill },
    { name: Navigation.menu.settings, to: `/dashboard/${organisationId}/settings`, icon: RiSettings4Fill }
  ]

  useEffect(() => {
    (async () => {
      if (organisation && organisation.id === organisationId) return;
      if (!organisationId) return;
      try {
        const org = await getExtendedOrganisation(organisationId);
        const projects = await getProjectsForOrganisation(org.id);
        setOrganisation({ ...org, projects });
      } catch (e) {
        setError(e)
      }
    })()
  }, [organisationId, organisation, setOrganisation, setError])

  useEffect(() => {
    if (!organisation) return;

    const root = window.document.documentElement;
    const [h, s, l] = hexToHSL(organisation.brandColors[2]);
    root.style.setProperty('--color-primary-50', `hsl(${h},${s}%,95%)`);
    root.style.setProperty('--color-primary-100', `hsl(${h},${s}%,90%)`);
    root.style.setProperty('--color-primary-200', `hsl(${h},${s}%,80%)`);
    root.style.setProperty('--color-primary-300', `hsl(${h},${s}%,70%)`);
    root.style.setProperty('--color-primary-500', `hsl(${h},${s}%,40%)`);
    root.style.setProperty('--color-primary-600', `hsl(${h},${s}%,30%)`);
    root.style.setProperty('--color-primary-700', `hsl(${h},${s}%,30%)`);
    root.style.setProperty('--color-primary-800', `hsl(${h},${s}%,20%)`);
    root.style.setProperty('--color-primary-appropriate', 'rgb(0,0,0)');


    return () => {
      setOrganisation(undefined);
      const mint = {
        50: '#F7FBF9',
        100: '#CFFDF4',
        200: '#cfece7',
        300: '#91ECDA',
        400: '#50C7B0',
        500: '#47B19D',
        600: '#3F9E8C',
        700: '#2F7B6D',
        800: '#215A4F',
        900: '#12332D'
      }

      const root = window.document.documentElement;
      root.style.setProperty('--color-primary-50', mint['50']);
      root.style.setProperty('--color-primary-100', mint['100']);
      root.style.setProperty('--color-primary-200', mint['200']);
      root.style.setProperty('--color-primary-300', mint['300']);
      root.style.setProperty('--color-primary-400', mint['400']);
      root.style.setProperty('--color-primary-500', mint['500']);
      root.style.setProperty('--color-primary-600', mint['600']);
      root.style.setProperty('--color-primary-700', mint['700']);
      root.style.setProperty('--color-primary-800', mint['800']);
      root.style.setProperty('--color-primary-900', mint['900']);
      root.style.setProperty('--color-primary-appropriate', 'rgb(0,0,0)');
    }
  }, [organisation, setOrganisation])

  const onboardingSteps = [
    !organisation?.projects || organisation?.projects.length === 0 ? <div className="flex-1 flex flex-col items-start justify-center">
      <h2 className="font-bold text-primary-800 text-lg sm:text-xl ml-0">Get started</h2>
      <p>Thank you for taking the first step in helping your community! Next up, creating a project that outlines what you want to achieve and how people can get involved.</p>
      <div className="flex items-center text-primary-500 mt-1">
        <p className="text-sm font-semibold">Make first project <span aria-hidden="true">→</span></p>
      </div>
    </div> : undefined,
    !organisation?.domainName ? <div className="flex-1 flex flex-col items-start justify-center border-gray-100">
      <h2 className="font-bold text-primary-800 text-lg sm:text-xl ml-0">World wide web</h2>
      <p>Websites can be an expensive, complicated part of running an organisation but it is key in outreach and funding. With GoodHub, you get a zero-fuss website for free.</p>
      <div className="flex items-center text-primary-500 mt-1">
        <p className="text-sm font-semibold">Set up website <span aria-hidden="true">→</span></p>
      </div>
    </div> : undefined,
    organisation && organisation.people.length <= 1 ? <Link to={`/dashboard/${organisation?.id}/team`} className="flex-1 flex flex-col items-start justify-center border-gray-100">
      <h2 className="font-bold text-primary-800 text-lg sm:text-xl ml-0">Your team</h2>
      <p>Making a change is easier with others! Start inviting more people to your organisation to help you make a difference. Don't worry, you will still be the only administrator for now.</p>
      <div className="flex items-center text-primary-500 mt-1">
        <p className="text-sm font-semibold">Invite a new team member <span aria-hidden="true">→</span></p>
      </div>
    </Link> : undefined
  ].filter(Boolean)

  return <div className="flex flex-col md:flex-row">
    <div className="hidden md:flex md:w-48 flex-col md:mr-8 flex-shrink-0">
      <Menu navigation={navigation} />
      <div className="justify-center hidden md:flex">
        <Link to="/info/privacy">
          <p className="text-gray-700 dark:text-white text-sm">Privacy Policy</p>
        </Link>
      </div>
    </div>
    <div className="flex flex-grow flex-col">
      {onboardingSteps.length ? <Card className="overflow-hidden mb-4">
        <div className="border-t-8 border-primary-500 p-6 sm:p-8 flex space-x-4">
          { onboardingSteps }
        </div>
      </Card> : null}
      {organisation ? children : <div className="flex-1 flex justify-center items-center">
        <Spinner />
      </div>}
    </div>
  </div>;
}

export default Organisational;