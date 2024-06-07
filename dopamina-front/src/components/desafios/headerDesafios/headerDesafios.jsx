/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './headerDesafios.module.scss';
import Button from '../../button/button';
import Modal from '../modalCriarDesafio/modalCriarDesafio';
import { IoMdAdd } from 'react-icons/io';

const HeaderDesafios = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCriarDesafio = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className={styles.headerDesafio}>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.headerButton}>
          <Button
            icon={<IoMdAdd />}
            onClick={handleCriarDesafio}
            id="atividade"
            text="Criar Desafio"
          />
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default HeaderDesafios;
