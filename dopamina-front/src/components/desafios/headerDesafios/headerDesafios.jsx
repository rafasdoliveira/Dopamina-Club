/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './headerDesafios.module.scss';
import Button from '../../button/button';
import Modal from '../modalCriarDesafio/modalCriarDesafio';
Modal;

const HeaderDesafios = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCriarDesafio = () => {
    console.log('clicou');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  <Modal isOpen={isModalOpen} onClose={handleCloseModal} />;

  return (
    <header className={styles.headerDesafio}>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div className={styles.headerButton}>
        <Button
          onClick={handleCriarDesafio}
          id="atividade"
          text="Criar Desafio"
        />
      </div>
    </header>
  );
};

export default HeaderDesafios;