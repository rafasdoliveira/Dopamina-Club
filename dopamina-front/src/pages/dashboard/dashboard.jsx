import { useState } from 'react';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import styles from './dashboard.module.scss';
import Perfil from '../../components/perfil/perfil';
import MeusDesafios from '../../components/desafios/meusDesafios/meusDesafios';
import DesafiosPublicos from '../../components/desafios/desafiosPublicos/desafiosPublicos';
import DesafiosPrivados from '../../components/desafios/desafiosPrivados/desafiosPrivados';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const [selectedItem, setSelectedItem] = useState('Meu Perfil');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (selectedItem) {
      case 'Meu Perfil':
        return <Perfil />;
      case 'Meus Desafios':
        return <MeusDesafios />;
      case 'Desafios Públicos':
        return <DesafiosPublicos />;
      case 'Desafios Privados':
        return <DesafiosPrivados />;
      case 'Sair':
        return navigate('/');
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Sidebar onSelectItem={setSelectedItem} />
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </>
  );
};

export default Feed;
