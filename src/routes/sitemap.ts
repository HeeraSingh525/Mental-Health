import { SvgIconProps } from '@mui/material';
import paths, { rootPaths } from './paths';
// import DashboardIcon from 'components/icons/DashboardIcon';

export interface MenuItem {
  id: number;
  name: string;
  pathName: string;
  path?: string;
  active?: boolean;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
  items?: MenuItem[];
}

const sitemap: MenuItem[] = [
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
      {
        id: 11,
        name: 'Sign up',
        path: paths.signup,
        pathName: 'sign-up',
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
    icon: 'mdi:chart-donut-variant',
    active: true,
  },
  {
    id: 4,
    name: 'Emotions',
    path: '/Emotions',
    pathName: 'products',
    icon: 'mdi:emoticon',
    active: true,
  },
  {
    id: 5,
    name: 'Sales Report',
    path: '#!',
    pathName: 'sales-report',
    icon: 'mdi:report-box-multiple-outline',
    active: false,
  },
  {
    id: 6,
    name: 'Messages',
    path: '#!',
    pathName: 'messages',
    icon: 'mdi:message-processing-outline',
    active: false,
  },
  {
    id: 7,
    name: 'Settings',
    path: '/Settings',
    pathName: 'settings',
    icon: 'mdi:settings',
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
