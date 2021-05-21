import { FC, Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import AuthenticationHeaderItem from './AuthenticationHeaderItem';
import Button from '../generic/Button';
import { useAuthenticationService } from '../../services/authentication-service';
import { Menu, Transition } from '@headlessui/react';
import { IOrganisation } from '@strawberrylemonade/goodhub-lib';
import { getOrganisation } from '../../services/organisation-service';
import { useErrorService } from '../../services/error-service';
import Skeleton from '../generic/Skeleton';
import { ModalState } from '../generic/Modal';
import NavMenu from '../generic/Menu';
import CreateOrganisationWizard from '../dashboard/organisation-configuration/CreateOrganisationWizard';
import Navigation from '../../translations/Navigation';
import { TiHome } from 'react-icons/ti';
import { MdForum } from 'react-icons/md';
import { RiSettings4Fill, RiUserFollowFill } from 'react-icons/ri';

const GhVolunteer: FC<{ className: string }> = ({ className }) => <svg className={className} width="22" height="18" viewBox="0 0 22 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.95448 3.7985C5.81594 3.7985 6.51487 3.09958 6.51487 2.23812C6.51487 1.37666 5.81594 0.677734 4.95448 0.677734C4.09302 0.677734 3.3941 1.37666 3.3941 2.23812C3.3941 3.09958 4.09302 3.7985 4.95448 3.7985ZM17.4376 3.7985C18.299 3.7985 18.9979 3.09958 18.9979 2.23812C18.9979 1.37666 18.299 0.677734 17.4376 0.677734C16.5761 0.677734 15.8772 1.37666 15.8772 2.23812C15.8772 3.09958 16.5761 3.7985 17.4376 3.7985ZM21.5238 15.8947L20.0935 12.3189L18.7574 13.8272L18.6924 14.4189L19.5928 16.6684C19.7554 17.0748 20.1455 17.3218 20.5583 17.3218C20.6884 17.3218 20.8184 17.2991 20.9452 17.2471C21.4783 17.0325 21.7384 16.4279 21.5238 15.8947ZM20.412 9.07455L19.8106 6.46741C19.6611 5.81725 19.206 5.27112 18.5916 5.0078C17.9902 4.74774 17.3238 4.79 16.7679 5.11508C16.03 5.55069 15.4773 6.2366 15.2043 7.04605L14.8369 8.14808L14.3168 8.47966V5.35889C14.3168 5.07282 14.0827 4.83876 13.7967 4.83876H8.59538C8.30931 4.83876 8.07525 5.07282 8.07525 5.35889V8.47966L7.55187 8.14808L7.18453 7.04605C6.91472 6.23335 6.35883 5.55069 5.6209 5.11508C5.06176 4.79 4.39859 4.74774 3.7972 5.0078C3.18279 5.27112 2.72768 5.81725 2.57815 6.46741L1.98 9.07455C1.83046 9.72471 2.00275 10.4139 2.44811 10.9178L4.63265 13.3851L4.96098 16.3954C5.0195 16.9252 5.46811 17.3218 5.99474 17.3218C6.03375 17.3218 6.06951 17.3186 6.10852 17.3153C6.68066 17.2536 7.09026 16.7399 7.02849 16.1678L6.70016 13.1511C6.6514 12.7285 6.47586 12.3351 6.19304 12.0133L4.78544 10.4204L5.35758 8.13507L5.57864 8.79824C5.71192 9.20459 5.96548 9.55892 6.37508 9.858L8.03624 10.9145C8.18578 11.0088 8.42959 11.064 8.59538 11.077H13.7967C13.9625 11.064 14.2063 11.0088 14.3558 10.9145L16.017 9.858C16.4266 9.55892 16.6801 9.20784 16.8134 8.79824L17.0345 8.13507L17.6066 10.4204L16.199 12.0133C15.9162 12.3351 15.7406 12.7285 15.6919 13.1511L15.3635 16.1678C15.3018 16.7399 15.7146 17.2536 16.2835 17.3153C16.3225 17.3186 16.3583 17.3218 16.3973 17.3218C16.9207 17.3218 17.3725 16.9285 17.4311 16.3954L17.7594 13.3851L19.9439 10.9178C20.386 10.4139 20.5616 9.72471 20.412 9.07455ZM2.29858 12.3189L0.868224 15.8947C0.653671 16.4279 0.913735 17.0325 1.44687 17.2471C1.993 17.4616 2.5879 17.1918 2.7992 16.6684L3.69967 14.4189L3.63466 13.8272L2.29858 12.3189Z" />
</svg>

export interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  const user = useAuthenticationService(state => state.user);
  const setError = useErrorService(state => state.setError);

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [organisations, setOrganisations] = useState<(IOrganisation | string)[]>()
  const [createOrganisationModalState, setCreateOrganisationModalState] = useState<ModalState>(ModalState.Closed);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        if (!user?.organisations) return;
        setOrganisations(user.organisations);
        const organisations = await Promise.all(user.organisations.map(getOrganisation));
        setOrganisations(organisations);
      } catch (e) {
        setError(e);
      }
    })()
  }, [user, setOrganisations, setError])

  return <div className="w-screen fixed top-0 left-0 z-10 flex flex-col">
    <header className="bg-primary-500 transition-colors shadow-sm z-20">
      <CreateOrganisationWizard modalState={createOrganisationModalState} onDismiss={() => setCreateOrganisationModalState(ModalState.Closed)}></CreateOrganisationWizard>
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4 lg:px-8">
        <div className="flex h-16">
          <div className="flex flex-grow justify-between sm:justify-start px-2 lg:px-0">
          <div className="flex items-center md:hidden">
            <Button mode="primary" onClick={() => setMenuOpen(!isMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="w-6 h-6 -m-0.5 text-white" /> : <FiMenu className="w-6 h-6 -m-0.5 text-white" />}
            </Button>
          </div>

            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg className="h-7 mx-0 sm:h-8 sm:mx-1.5" viewBox="0 0 219 37">
                <defs />
                <g id="Untitled">
                  <path d="M3.41865+7.54775C3.41865+7.54775+4.1064+6.57265+4.5684+6.15625L15.2443+17.3568C15.2443+17.3568+15.5278+18.8932+13.0577+17.42L3.41865+7.54775ZM1.59427+10.8236C1.59427+10.8236+1.84365+9.95652+2.37915+9.01568L9.99428+16.9641C9.99428+16.9641+10.7109+18.6982+8.2434+17.6967L1.59427+10.8236ZM0.431396+14.5685C0.431396+14.5685+0.617772+13.517+0.924897+12.671L5.1774+17.0405C5.1774+17.0405+5.7024+18.8484+3.63915+17.565C3.63915+17.565+3.26902+17.4543+3.0144+17.2883C2.75977+17.1196+0.431396+14.5685+0.431396+14.5685Z" fill-rule="evenodd" fill="#ffffff" opacity="0.5548" />
                  <path d="M14.9135+0.261314C14.9135+0.261314+16.0816+0.0452101+16.7011+0.0715643L16.6066+15.5968C16.6066+15.5968+15.7456+16.8961+14.9949+14.1078L14.9135+0.261314ZM11.3382+1.33129C11.3382+1.33129+12.1179+0.885909+13.1521+0.588106L13.1127+11.6331C13.1127+11.6331+12.4276+13.3804+11.3514+10.9295L11.3382+1.33129ZM7.90999+3.19717C7.90999+3.19717+8.77099+2.57521+9.57686+2.18254L9.60312+8.30198C9.60312+8.30198+8.72899+9.96756+8.13837+7.59832C8.13837+7.59832+7.94936+7.26099+7.88374+6.96318C7.81811+6.66275+7.90999+3.19717+7.90999+3.19717Z" fill-rule="evenodd" fill="#ffffff" opacity="0.8982" />
                  <path d="M0.357909+21.3261C0.357909+21.3261+0.129534+20.1507+0.150534+19.5288L15.5645+19.4497C15.5645+19.4497+16.8639+20.3009+14.105+21.0916L0.357909+21.3261ZM1.45778+24.9129C1.45778+24.9129+1.00628+24.1328+0.69916+23.0945L11.6664+23.0102C11.6664+23.0102+13.4068+23.6822+10.9865+24.7917L1.45778+24.9129ZM3.35304+28.3442C3.35304+28.3442+2.72566+27.4851+2.32666+26.676L8.40091+26.5811C8.40091+26.5811+10.0652+27.4429+7.71841+28.0649C7.71841+28.0649+7.38504+28.2573+7.08841+28.3284C6.79441+28.3996+3.35304+28.3442+3.35304+28.3442Z" fill-rule="evenodd" fill="#ffffff" opacity="0.7443" />
                  <path d="M7.76845+33.0219C7.76845+33.0219+6.7867+32.3472+6.3667+31.8913L17.2762+20.9227C17.2762+20.9227+18.7961+20.609+17.3838+23.1232L7.76845+33.0219ZM11.0576+34.7955C11.0576+34.7955+10.1913+34.5609+9.24895+34.0391L16.9901+26.2172C16.9901+26.2172+18.6963+25.4608+17.7513+27.9645L11.0576+34.7955ZM14.7982+35.8945C14.7982+35.8945+13.7508+35.7284+12.9056+35.4359L17.1581+31.069C17.1581+31.069+18.9431+30.505+17.7067+32.6081C17.7067+32.6081+17.6043+32.9823+17.4442+33.2406C17.2841+33.4989+14.7982+35.8945+14.7982+35.8945Z" fill-rule="evenodd" fill="#ffffff" opacity="0.3937" />
                  <path d="M21.3369+35.7235C21.3369+35.7235+20.1688+35.9502+19.5519+35.9291L19.5151+20.4039C19.5151+20.4039+20.3656+19.0967+21.14+21.8797L21.3369+35.7235ZM24.9043+34.6219C24.9043+34.6219+24.1273+35.0752+23.0956+35.3809L23.0431+24.3359C23.0431+24.3359+23.7125+22.5833+24.8098+25.0237L24.9043+34.6219ZM28.3141+32.7244C28.3141+32.7244+27.4584+33.3543+26.6551+33.7549L26.5764+27.6381C26.5764+27.6381+27.4348+25.9646+28.0464+28.3286C28.0464+28.3286+28.238+28.6659+28.3063+28.9637C28.3798+29.2589+28.3141+32.7244+28.3141+32.7244Z" fill-rule="evenodd" fill="#ffffff" opacity="0.8982" />
                  <path d="M28.3166+3.12581C28.3166+3.12581+29.2958+3.80575+29.7131+4.26431L18.7433+15.1749C18.7433+15.1749+17.2234+15.4807+18.6488+12.9744L28.3166+3.12581ZM25.038+1.33636C25.038+1.33636+25.9016+1.57618+26.844+2.10327L19.0583+9.88302C19.0583+9.88302+17.3468+10.6288+18.3075+8.13047L25.038+1.33636ZM21.3026+0.216309C21.3026+0.216309+22.3474+0.387611+23.1926+0.685413L18.9165+5.02858C18.9165+5.02858+17.1289+5.58202+18.3758+3.48686C18.3758+3.48686+18.4808+3.11263+18.6409+2.85436C18.8036+2.59873+21.3026+0.216309+21.3026+0.216309Z" fill-rule="evenodd" fill="#ffffff" opacity="0.3959" />
                  <path d="M35.8244+14.7535C35.8244+14.7535+36.037+15.9315+36.0082+16.5535L20.5942+16.4165C20.5942+16.4165+19.3053+15.5468+22.0773+14.7957L35.8244+14.7535ZM34.7718+11.1483C34.7718+11.1483+35.2128+11.9336+35.5068+12.9772L24.5395+12.9061C24.5395+12.9061+22.807+12.2103+25.243+11.1351L34.7718+11.1483ZM32.9264+7.69322C32.9264+7.69322+33.5433+8.56027+33.9292+9.37462L27.8549+9.38516C27.8549+9.38516+26.2038+8.49966+28.5584+7.91196C28.5584+7.91196+28.8944+7.72221+29.191+7.65632C29.4877+7.59044+32.9264+7.69322+32.9264+7.69322Z" fill-rule="evenodd" fill="#ffffff" opacity="0.7398" />
                  <path d="M32.8398+28.3501C32.8398+28.3501+32.1626+29.3331+31.7032+29.7521L20.9092+18.6675C20.9092+18.6675+20.61+17.1337+23.0958+18.5806L32.8398+28.3501ZM34.6301+25.0532C34.6301+25.0532+34.3886+25.9229+33.8636+26.869L26.1645+19.0022C26.1645+19.0022+25.4295+17.276+27.9048+18.2512L34.6301+25.0532ZM35.7536+21.2977C35.7536+21.2977+35.5777+22.3492+35.2811+23.2005L30.9813+18.8784C30.9813+18.8784+30.438+17.0784+32.5143+18.3381C32.5143+18.3381+32.8845+18.4435+33.1417+18.6096C33.3963+18.7703+35.7536+21.2977+35.7536+21.2977Z" fill-rule="evenodd" fill="#ffffff" opacity="0.552" />
                  <g opacity="1">
                    <path d="M62.3061+33.3627C70.6513+33.3627+77.6875+26.4083+77.6875+18.0632L62.3061+18.0632L62.3061+22.3176L72.0422+22.3176C70.4877+26.2447+66.806+29.0264+62.3061+29.0264C56.2518+29.0264+51.7519+24.1175+51.7519+18.0632C51.7519+12.0088+56.2518+7.09989+62.3061+7.09989C65.4151+7.09989+68.0332+8.32712+69.915+10.3725L73.1876+7.09989C70.4877+4.4818+66.806+2.76367+62.3061+2.76367C53.8791+2.76367+46.843+9.63617+46.843+18.0632C46.843+27.1447+53.2246+33.3627+62.3061+33.3627Z" opacity="1" fill="#ffffff" />
                    <path d="M88.965+33.3627C93.8739+33.3627+98.1283+29.3537+98.1283+24.4448C98.1283+19.1268+94.283+15.5269+88.965+15.5269C84.056+15.5269+79.8016+19.5358+79.8016+24.4448C79.8016+29.7628+83.647+33.3627+88.965+33.3627ZM88.965+29.1083C86.3469+29.1083+84.3833+27.0629+84.3833+24.4448C84.3833+21.7449+86.3469+19.7813+88.965+19.7813C91.6649+19.7813+93.5466+21.7449+93.5466+24.4448C93.5466+27.0629+91.6649+29.1083+88.965+29.1083Z" opacity="1" fill="#ffffff" />
                    <path d="M109.507+33.3627C114.416+33.3627+118.67+29.3537+118.67+24.4448C118.67+19.1268+114.825+15.5269+109.507+15.5269C104.598+15.5269+100.344+19.5358+100.344+24.4448C100.344+29.7628+104.189+33.3627+109.507+33.3627ZM109.507+29.1083C106.889+29.1083+104.925+27.0629+104.925+24.4448C104.925+21.7449+106.889+19.7813+109.507+19.7813C112.207+19.7813+114.089+21.7449+114.089+24.4448C114.089+27.0629+112.207+29.1083+109.507+29.1083Z" opacity="1" fill="#ffffff" />
                    <path d="M130.049+33.3627C134.958+33.3627+139.213+29.3537+139.213+24.4448L139.213+3.17275L134.631+3.17275L134.631+16.9996C133.158+15.936+131.522+15.5269+129.804+15.5269C124.977+15.5269+120.886+19.5358+120.886+24.4448C120.886+29.7628+124.731+33.3627+130.049+33.3627ZM130.049+29.1083C127.431+29.1083+125.468+27.0629+125.468+24.4448C125.468+21.7449+127.431+19.7813+130.049+19.7813C132.749+19.7813+134.631+21.7449+134.631+24.4448C134.631+27.0629+132.749+29.1083+130.049+29.1083Z" opacity="1" fill="#ffffff" />
                    <path d="M146.688+32.9536L151.515+32.9536L151.515+20.1904L167.96+20.1904L167.96+32.9536L172.787+32.9536L172.787+3.17275L167.96+3.17275L167.96+15.936L151.515+15.936L151.515+3.17275L146.688+3.17275L146.688+32.9536Z" opacity="1" fill="#ffffff" />
                    <path d="M185.695+33.3627C190.358+33.3627+194.94+29.7628+194.94+24.4448L194.94+15.936L190.358+15.936L190.358+24.4448C190.358+27.0629+188.477+29.1083+185.777+29.1083C183.159+29.1083+181.195+27.0629+181.195+24.4448L181.195+15.936L176.613+15.936L176.613+24.4448C176.613+29.7628+180.377+33.3627+185.695+33.3627Z" opacity="1" fill="#ffffff" />
                    <path d="M207.756+33.3627C212.665+33.3627+216.919+29.3537+216.919+24.4448C216.919+19.1268+213.319+15.5269+208.165+15.5269C206.038+15.5269+204.156+16.2632+203.174+17.4086L203.174+3.17275L198.592+3.17275L198.592+24.4448C198.592+29.7628+202.438+33.3627+207.756+33.3627ZM207.756+29.1083C205.138+29.1083+203.174+27.0629+203.174+24.4448C203.174+21.7449+205.138+19.7813+207.756+19.7813C210.456+19.7813+212.337+21.7449+212.337+24.4448C212.337+27.0629+210.456+29.1083+207.756+29.1083Z" opacity="1" fill="#ffffff" />
                  </g>
                </g>
              </svg>
            </Link>
            <nav aria-label="Global" className="sm:ml-6 flex items-center space-x-4">
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button>
                      <Button className="hidden sm:flex" mode="primary">Organisations <FiChevronDown className="ml-2" /></Button>
                      <Button className="flex sm:hidden" mode="primary">
                        <svg className="h-5" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.9404 6.19781H24.044L21.0332 0.27682L3.06888 0.275879L0.0580444 6.19687H1.1617V22.0536H0.157763V24.0605H23.8427V22.0536H22.8387L22.8397 6.19783L22.9404 6.19781ZM21.0332 21.9539H18.0224V18.943C18.0224 17.8394 17.1191 16.9361 16.0155 16.9361C14.9118 16.9361 14.0086 17.8394 14.0086 18.943V21.9539H10.0945V18.943C10.0945 17.8394 9.19123 16.9361 8.08758 16.9361C6.98393 16.9361 6.08068 17.8394 6.08068 18.943V21.9539H3.06984L3.0689 6.19781H20.8328V21.9539H21.0332Z" fill="white" />
                          <path d="M17.0194 8.20459H19.0263V10.2115H17.0194V8.20459Z" fill="white" />
                          <path d="M13.1053 8.20459H15.1122V10.2115H13.1053V8.20459Z" fill="white" />
                          <path d="M9.09058 8.20459H11.0975V10.2115H9.09058V8.20459Z" fill="white" />
                          <path d="M5.17645 8.20459H7.18336V10.2115H5.17645V8.20459Z" fill="white" />
                          <path d="M17.0194 12.1189H19.0263V14.1258H17.0194V12.1189Z" fill="white" />
                          <path d="M13.1053 12.1189H15.1122V14.1258H13.1053V12.1189Z" fill="white" />
                          <path d="M9.09058 12.1189H11.0975V14.1258H9.09058V12.1189Z" fill="white" />
                          <path d="M5.17645 12.1189H7.18336V14.1258H5.17645V12.1189Z" fill="white" />
                        </svg>

                        <FiChevronDown className="ml-2" /></Button>
                    </Menu.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="origin-top-right sm:origin-top-left absolute right-0 sm:right-auto sm:left-0 mt-2 p-2 w-max-content rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {organisations ? organisations.map(o => {
                          return <Menu.Item onClick={() => history.push(`/dashboard/${typeof o !== 'string' ? o.id : o}`)}>
                            <div className="w-full cursor-pointer flex items-center p-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium hover:bg-gray-100">
                              <div className={`w-8 h-8 border overflow-hidden border-gray-300 rounded-lg mr-3`}>
                                {typeof o !== 'string' ? <img src={o.profilePicture?.thumbnail} alt={o.profilePicture?.alt} /> : null}
                              </div>
                              <p>{typeof o !== 'string' ? o.name : <Skeleton width="200" />}</p>
                            </div>
                          </Menu.Item>
                        }) : <div className="py-3 px-6 flex justify-center">
                          <p className="text-xs font-medium text-gray-500 uppercase py-1">You are not in any organisations</p>
                        </div>}
                        <Button className="mt-1 w-full" onClick={() => setCreateOrganisationModalState(ModalState.Open)}>
                          Create your own organisation!
                      </Button>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </nav>
          </div>
          <div className="flex items-center -ml-3 mr-3 md:mr-0 md:ml-0">
            <AuthenticationHeaderItem />
          </div>
        </div>
      </div>
    </header>
    {isMenuOpen ? <>
      <div className="fixed inset-0 bg-black opacity-75 z-10" />
      <div onClick={() => setMenuOpen(false)} className="bg-white p-2 border-b border-gray-200 shadow-xl z-20">
        <NavMenu navigation={[
          { name: Navigation.menu.feed, to: '/', icon: TiHome },
          { name: Navigation.menu.conversations, to: '/conversations', icon: MdForum },
          { name: Navigation.menu.following, to: '/following', icon: RiUserFollowFill },
          { name: Navigation.menu.volunteering, to: '/volunteering', icon: GhVolunteer },
          { name: Navigation.menu.settings, to: '/settings', icon: RiSettings4Fill }
        ]} />
      </div>
    </> : null}
  </div>
}

export default Header;