import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.containerNotFound}>
      <h1 className={css.headerNotFound}>404</h1>
      <p className={css.textNotFound}>Page Not Found</p>
      <Link to="/" className={css.linkNotFound}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
