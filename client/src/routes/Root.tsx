import { lazy, Suspense } from 'react';

import { useAuth } from '../auth/AuthContext';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from '../components/NavBar';

const LoginPage = lazy(() => import('../pages/LoginPage'));

function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    )
  }

  return (
    <section className='flex min-h-screen bg-transparent text-slate-900'>
      <NavBar />
      <main className='min-h-screen w-full overflow-hidden px-4 py-4 sm:px-6 lg:px-8 lg:py-6'>
        <Outlet />
      </main>
      <Toaster position='top-right' duration={5000} visibleToasts={4} richColors />
    </section>
  )
}

export default Root;
