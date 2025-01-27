import { lazy, Suspense } from 'react';
import Loader from './Loader/Loader.jsx';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = lazy(() => import('./Layout.jsx'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const TeachersPage = lazy(() =>
  import('../pages/TeachersPage/TeachersPage.jsx'),
);
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage/FavoritesPage.jsx'),
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage.jsx'),
);

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route
              path="favorite"
              element={
                // <PrivateRoute>
                <FavoritesPage />
                // </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
