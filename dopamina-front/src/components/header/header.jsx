import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../button/button';
import { MdLogin, MdExitToApp } from 'react-icons/md';

import styles from './header.module.scss';

const Header = () => {
  const [navLinks, setNavLinks] = useState([
    { id: 1, path: '/', text: 'Sobre' },
    { id: 2, path: '/', text: 'Funcionalidades' },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setNavLinks([]);
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem('token');
      setIsLoggedIn(false);
      setNavLinks([
        { id: 1, path: '/', text: 'Sobre' },
        { id: 2, path: '/', text: 'Funcionalidades' },
      ]);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header>
      <Link to="/">
        <h1>DC</h1>
      </Link>
      <nav className={styles.navLinks}>
        <ul>
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link to={item.path}>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className={styles.navButtons}>
        <Button
          // id="header"
          text={isLoggedIn ? 'Logout' : 'Login'}
          onClick={handleLoginLogout}
          icon={isLoggedIn ? <MdExitToApp /> : <MdLogin />}
          id={isLoggedIn ? styles.logoutButton : styles.loginButton}
        />
      </nav>
    </header>
  );
};

export default Header;
