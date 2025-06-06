import paths, { rootPaths } from './paths';
// import DashboardIcon from 'components/icons/DashboardIcon';

const sitemap = [
  {
    id: 1,
    name: 'Dashboard',
    path: rootPaths.root,
    pathName: 'dashboard',
    icon: 'mdi:view-dashboard',
    active: true,
  },
  {
    id: 9,
    name: 'Authentication',
    pathName: 'authentication',
    icon: 'material-symbols:security-rounded',
    active: false,
    items: [
      {
        id: 10,
        name: 'Sign in',
        path: paths.signin,
        pathName: 'sign-in',
        active: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Users',
    path: '/Users',
    pathName: 'Users',
    icon: 'mdi:users',
    active: true,
  },
  {
    id: 3,
    name: 'Chat Logs',
    path: '/ChatLogs',
    pathName: 'order',
    icon: 'mdi:chat-processing',
    active: true,
  },
  {
    id: 4,
    name: 'Sales Report',
    path: '#!',
    pathName: 'sales-report',
    icon: 'mdi:report-box-multiple-outline',
    active: false,
  },
  {
    id: 5,
    name: 'Messages',
    path: '#!',
    pathName: 'messages',
    icon: 'mdi:message-processing-outline',
    active: false,
  },
  {
    id: 6,
    name: 'Settings',
    path: '/Settings',
    pathName: 'settings',
    icon: 'mdi:settings',
    active: true,
  },
  {
    id: 7,
    name: 'Subscriber',
    path: '/Subscriber',
    pathName: 'Subscriber',
    icon: 'humbleicons:logout',
    active: true,
  },
  {
    id: 8,
    name: 'Sign Out',
    path: 'authentication/sign-in',
    pathName: 'sign-out',
    icon: 'humbleicons:logout',
    active: true,
  },
];

export default sitemap;
