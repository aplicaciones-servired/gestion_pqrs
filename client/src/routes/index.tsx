import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './Root';


const ReporteChat_box = lazy(() => import('../pages/ReporteChat_bot'));

export const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><ReporteChat_box /></Suspense>
      }
    ]
  }
]);