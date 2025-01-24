import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Loader from './Loader/Loader.jsx';

const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};

export default Layout;
