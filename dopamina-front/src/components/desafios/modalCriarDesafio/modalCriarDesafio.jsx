/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import Input from '../../form/input/input';
import Button from '../../button/button';
import Select from '../../form/select/select';
import Textarea from '../../form/textarea/textarea';
import styles from './modalCriarDesafio.module.scss';
import { GoPencil, GoCalendar } from 'react-icons/go';
import { IoIosCloseCircle, IoMdAdd } from 'react-icons/io';

const Modal = ({ isOpen, onClose, onDesafioCriado }) => {
  const [desafio, setDesafio] = useState({
    titulo: '',
    data_inicial: '',
    data_final: '',
    tipo: '',
    descricao: '',
  });

  const handleClose = () => {
    setDesafio({
      titulo: '',
      data_inicial: '',
      data_final: '',
      tipo: '',
      descricao: '',
    });
    onClose();
  };

  const validateForm = () => {
    const camposPendentes = [];
    if (!desafio.titulo) camposPendentes.push('Título');
    if (!desafio.data_inicial) camposPendentes.push('Data Inicial');
    if (!desafio.data_final) camposPendentes.push('Data Final');
    if (!desafio.tipo) camposPendentes.push('Tipo do Desafio');
    if (!desafio.descricao) camposPendentes.push('Descrição');
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
      const token = sessionStorage.getItem('token');
      if (!token) {
        return;
      }

      const response = await axios.post(
        'http://localhost:8081/desafios',
        desafio,
        {
          headers: {
            Authorization: `${token}`,
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

  const options = [
    { value: 'Público', label: 'Público' },
    { value: 'Privado', label: 'Privado' },
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={handleClose}>
          <IoIosCloseCircle />
        </button>
        <h2>Criar Novo Desafio</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__group}>
            <label htmlFor="titulo">Título</label>
            <Input
              icon={<GoPencil />}
              type="text"
              id="titulo"
              value={desafio.titulo}
              onChange={(e) =>
                setDesafio({ ...desafio, titulo: e.target.value })
              }
              placeholder="Defina um nome para seu desafio"
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="data_inicial">Data Inicial</label>
            <Input
              icon={<GoCalendar />}
              type="date"
              id="data_inicial"
              value={desafio.data_inicial}
              onChange={(e) =>
                setDesafio({ ...desafio, data_inicial: e.target.value })
              }
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="data_final">Data Final</label>
            <Input
              icon={<GoCalendar />}
              type="date"
              id="data_final"
              value={desafio.data_final}
              onChange={(e) =>
                setDesafio({ ...desafio, data_final: e.target.value })
              }
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="tipo">Tipo do Desafio</label>
            <Select
              text="Selecione o tipo de desafio"
              id="tipo"
              name="tipo"
              value={desafio.tipo}
              onChange={(e) => setDesafio({ ...desafio, tipo: e.target.value })}
              options={options}
            />
          </div>
          <div className={styles.input__group}>
            <label htmlFor="descricao">Descrição</label>
            <Textarea
              id="descricao"
              placeholder="Crie uma descrição para o Desafio"
              value={desafio.descricao}
              onChange={(e) =>
                setDesafio({ ...desafio, descricao: e.target.value })
              }
            />
          </div>
          <div className={styles.button_desafio}>
            <Button
              icon={<IoMdAdd />}
              id="atividade"
              text="Criar Desafio"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
