/* eslint-disable react/prop-types */
import styles from './sidebar.module.scss';
import { FaPager } from 'react-icons/fa';
import { FaLock, FaUnlock, FaUserLarge } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { GoGoal } from 'react-icons/go';

const Sidebar = ({ onSelectItem }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li onClick={() => onSelectItem('Meu Perfil')}>
          <span>
            <FaUserLarge />
          </span>
          <span>Meu Perfil</span>
        </li>
        <li onClick={() => onSelectItem('Feed')}>
          <span>
            <FaPager />
          </span>
          <span>Feed</span>
        </li>
        <li onClick={() => onSelectItem('Meus Desafios')}>
          <span>
            <GoGoal />
          </span>
          <span>Meus Desafios</span>
        </li>
        <li onClick={() => onSelectItem('Desafios Públicos')}>
          <span>
            <FaUnlock />
          </span>
          <span>Desafios Públicos</span>
        </li>
        <li onClick={() => onSelectItem('Desafios Privados')}>
          <span>
            <FaLock />
          </span>
          <span>Desafios Privados</span>
        </li>
        <li onClick={() => onSelectItem('Sair')}>
          <span>
            <FiLogOut />
          </span>
          <span>Sair</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
