import { RouteObject } from 'react-router';
import { lazy } from 'react';
import HomePage from './pages/index';
import ProjectsPage from './pages/projects';
import CapabilitiesPage from './pages/capabilities';
import AboutPage from './pages/about';
import ProposalPage from './pages/proposal';
import AdminLoginPage from './pages/admin/index';
import AdminProjectsPage from './pages/admin/projects';
// Eager import so renderToString does not hit a Suspense boundary on 404 routes
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/projects', element: <ProjectsPage /> },
  { path: '/capabilities', element: <CapabilitiesPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/proposal', element: <ProposalPage /> },
  { path: '/admin', element: <AdminLoginPage /> },
  { path: '/admin/projects', element: <AdminProjectsPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export type Path = '/';
export type Params = Record<string, string | undefined>;
