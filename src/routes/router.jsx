import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import paths, { rootPaths } from './paths';

const App = lazy(() => import('../App'));
const MainLayout = lazy(() => import('../layouts/main-layout'));
const AuthLayout = lazy(() => import('../layouts/auth-layout'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const SignIn = lazy(() => import('../pages/authentication/SignIn'));
const Page404 = lazy(() => import('../pages/errors/Page404'));
const Users = lazy(() => import('../pages/Users/Users'));
const UserDetail = lazy(() => import('../pages/Users/UserDetail'));
const UserEdit = lazy(() => import('../pages/Users/UserEdit'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const RequireAuth = lazy(() => import('../components/auth/RequireAuth'));
const ChatLogs = lazy(() => import('../pages/chatLogs/ChatLogs'));
const Subscriber = lazy(() => import('../pages/subscriber/Subscriber'));
const CreatePlan = lazy(() => import('../pages/plans/CreatePlan'));
const PlanList = lazy(() => import('../pages/plans/PlanList'));
const PlanEdit = lazy(() => import('../pages/plans/PlanEdit'));
const PlanDetail = lazy(() => import('../pages/plans/PlanDetail'));
const Notifications = lazy(() => import('../pages/notifications/Notifications'));

import SingleChat from '../pages/chatLogs/SingalChat';
import PageLoader from '../components/loading/PageLoader';
import Progress from '../components/loading/Progress';

export const routes = [
  {
    element: (
      <Suspense fallback={<Progress />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: rootPaths.root,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: (
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            ),
          },
          {
            path: '/Users',
            element: <Users />,
          },
          {
            path: '/Users/:id',
            element: <UserDetail />,
          },
          {
            path: '/Users/UserEdit/:id',
            element: <UserEdit />,
          },
          {
            path: '/ChatLogs',
            element: <ChatLogs />,
          },
          {
            path: '/SingleChat/:id',
            element: <SingleChat />,
          },
          {
            path: '/Settings',
            element: <Settings />,
          },
          {
            path: '/Subscriber',
            element: <Subscriber />,
          },
          {
            path: '/CreatePlan',
            element: <CreatePlan />,
          },
          {
            path: '/PlanList',
            element: <PlanList />,
          },
          {
            path: '/PlanList/PlanEdit/:id',
            element: <PlanEdit />,
          },
          {
            path: '/PlanList/:id',
            element: <PlanDetail />,
          },
          {
            path: '/Notifications',
            element: <Notifications />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: <AuthLayout />,
        children: [
          {
            path: paths.signin,
            element: <SignIn />,
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/Mental-Health' });

export default router;
