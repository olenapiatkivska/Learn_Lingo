import { NavLink } from 'react-router-dom';
import Container from '../Container/Container.jsx';
import Icon from '../../shared/Icon.jsx';
import { useEffect, useState } from 'react';
import css from './Header.module.css';
import Modal from '../../shared/Modal/Modal.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx';
import { toast } from 'react-toastify';
import { auth } from '../../services/firebaseConfig.js';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from '../../redux/SliceAuth.js';

const Header = () => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(null);
  const authUser = useSelector(state => state.authUser.token);
  const dispatch = useDispatch();
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleRegisterSuccess = user => {
    setRegisterOpen(false);
    setUser(user);
  };

  const handleLoginSuccess = user => {
    setLoginOpen(false);
    setUser(user);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout successful!');
      setUser(null);
      dispatch(deleteToken());
    } catch (error) {
      toast.error('Logout failed. Try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(maybeUser => {
      const user = auth.currentUser;

      if (authUser || user) {
        return setUser(maybeUser);
      }
      return;
    });
  }, [authUser]);

  return (
    <Container>
      <header className={css.header}>
        <div className={css.headerContainer}>
          <NavLink to="/" className={css.linkLogo}>
            <Icon
              id="ukraine"
              className={css.iconLogo}
              width={28}
              height={28}
              ariaLabel="Ukraine flag"
            />
            <p className={css.textLogo}>LearnLingo</p>
          </NavLink>
          <nav className={css.headerNav}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.activeLink}` : `${css.link}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.activeLink}` : css.link
              }
              to="/teachers"
            >
              Teachers
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.activeLink}` : css.link
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          </nav>

          {!user ? (
            <div className={css.btnHeader}>
              <button
                className={css.btnLogIn}
                onClick={() => setLoginOpen(true)}
              >
                <Icon
                  id="log-in"
                  className={css.iconLogIn}
                  width={20}
                  height={20}
                  ariaLabel="Log-in"
                />
                Log in
              </button>

              <button
                className={css.btnRegistration}
                onClick={() => setRegisterOpen(true)}
              >
                Registration
              </button>
            </div>
          ) : (
            <button className={css.btnLogOut} onClick={handleLogout}>
              Log Out
            </button>
          )}
          <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
            <RegistrationForm
              onClose={() => setRegisterOpen(false)}
              onRegisterSuccess={handleRegisterSuccess}
            />
          </Modal>
          <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
            <LoginForm
              onClose={() => setLoginOpen(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          </Modal>
        </div>
      </header>
    </Container>
  );
};

export default Header;
