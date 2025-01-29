import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './Root';


const Home = lazy(() => import('../pages/Home'));

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>
      }
    ]
  }
]);