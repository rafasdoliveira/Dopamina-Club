/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

import Input from '../../form/input/input';
import Textarea from '../../form/textarea/textarea';
import Button from '../../button/button';

import styles from './modalCriarDesafio.module.scss';
import { GoCalendar, GoPencil } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';

const ModalEnviarAtividade = ({ isOpen, onClose, onDesafioCriado }) => {
  const [desafio, setDesafio] = useState({
    titulo: '',
    data: '',
    descricao: '',
  });

  const handleClose = () => {
    setDesafio({
      titulo: '',
      data: '',
      descricao: '',
    });
    onClose();
  };

  const validateForm = () => {
    const camposPendentes = [];
    if (!desafio.titulo) camposPendentes.push('Título');
    if (!desafio.data) camposPendentes.push('Data Inicial');
    if (!desafio.descricao) camposPendentes.push('Data Final');
    return camposPendentes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposPendentes = validateForm();
    if (camposPendentes.length > 0) {
      alert(
        `Os seguintes campos são obrigatórios: ${camposPendentes.join(', ')}`,
      );
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const response = await axios.post(
        'http://localhost:8081/atividades',
        desafio,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      alert('Desafio criado com sucesso!');
      onDesafioCriado();
      handleClose();
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={handleClose}>
          <IoIosCloseCircle />
        </button>
        <h2>Enviar Nova Atividade</h2>
        <form>
          <div className={styles.input__group}>
            <Input
              icon={<GoCalendar />}
              type="text"
              name="titulo"
              placeholder="Defina um título para sua atividade"
              // value={desafio.data_inicial}
              // onChange={(e) =>
              //   setDesafio({ ...desafio, data_inicial: e.target.value })
              // }
            />
          </div>
          <div className={styles.input__group}>
            <label>Data da Atividade</label>
            <Input
              icon={<GoPencil />}
              type="date"
              name="data_inicial"
              // value={desafio.data_inicial}
              // onChange={(e) =>
              //   setDesafio({ ...desafio, data_inicial: e.target.value })
              // }
            />
          </div>
          <div className={styles.input__group}>
            <label>Descrição</label>
            {/* Corrigido para passar o nome correto do estilo do textarea */}
            <Textarea
              id="textarea" // Troquei para o estilo correto aqui
              placeholder="Descreva sua atividade"
            />
          </div>
          <div className={styles.button_atividade}>
            <Button id="atividade" text="Enviar Atividade" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEnviarAtividade;
