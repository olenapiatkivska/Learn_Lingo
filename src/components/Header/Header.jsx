import { NavLink } from 'react-router-dom';
import Container from '../Container/Container.jsx';
import Icon from '../../shared/Icon.jsx';
import { useState } from 'react';
import css from './Header.module.css';
import Modal from '../../shared/Modal/Modal.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import RegistrationForm from '../RegistrationForm/RegistrationForm.jsx';
import { ToastContainer } from 'react-toastify';
import { auth } from '../../services/firebaseConfig.js';

const Header = () => {
  //   const [isRegisterOpen, setRegisterOpen] = useState(false);
  //   const [isLoginOpen, setLoginOpen] = useState(false);
  //   const [currentUser, setCurrentUser] = useState(null);

  //   const handleRegisterSuccess = user => {
  //     setRegisterOpen(false);
  //     setCurrentUser(user);
  //   };

  //   const handleLoginSuccess = user => {
  //     setLoginOpen(false);
  //     setCurrentUser(user);
  //   };

  //   const handleLogout = () => {
  //     auth.signOut();
  //     setCurrentUser(null);
  //   };

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
          </nav>

          {!currentUser ? (
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
            <button onClick={handleLogout}>Log Out</button>
          )}

          {/* <Modal isOpen={isRegisterOpen} onClose={() => setRegisterOpen(false)}>
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
          </Modal> */}

          <ToastContainer />
        </div>
      </header>
    </Container>
  );
};

export default Header;
