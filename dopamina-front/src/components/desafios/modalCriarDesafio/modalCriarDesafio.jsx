/* eslint-disable react/prop-types */
import styles from './modalCriarDesafio.module.scss';
import Input from '../../form/input/input';
import Button from '../../button/button';
import { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { GoPencil, GoCalendar } from 'react-icons/go';
import Select from '../../form/select/select';
import axios from 'axios';
import Textarea from '../../form/textarea/textarea';

const Modal = ({ isOpen, onClose }) => {
  const [desafio, setDesafio] = useState({
    titulo: '',
    data_inicial: '',
    data_final: '',
    tipo: 'publico',
    descricao: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8081/desafios',
        desafio,
      );

      alert(response.data.message);
      console.log({ response });
      setDesafio('');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const options = [
    { value: 'publico', label: 'Público' },
    { value: 'privado', label: 'Privado' },
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={onClose}>
          <IoIosCloseCircle />
        </button>
        <h2>Criar Novo Desafio</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.input__group}>
            <label>Título</label>
            <Input
              icon={<GoPencil />}
              type="text"
              id="form"
              value={desafio.titulo}
              onChange={(e) =>
                setDesafio({ ...desafio, titulo: e.target.value })
              }
              placeholder="Defina um nome para seu desafio"
            />
          </div>
          <div className={styles.input__group}>
            <label>Data Inicial</label>
            <Input
              icon={<GoCalendar />}
              type="date"
              id="form"
              value={desafio.data_inicial}
              onChange={(e) =>
                setDesafio({ ...desafio, data_inicial: e.target.value })
              }
            />
          </div>
          <div className={styles.input__group}>
            <label>Data Final</label>
            <Input
              icon={<GoCalendar />}
              type="date"
              id="form"
              value={desafio.data_final}
              onChange={(e) =>
                setDesafio({ ...desafio, data_final: e.target.value })
              }
            />
          </div>
          <div className={styles.input__group}>
            <label>Tipo do Desafio</label>
            <Select
              id="mySelect"
              name="tipo"
              value={desafio.tipo}
              onChange={(e) => setDesafio({ ...desafio, tipo: e.target.value })}
              options={options}
            />
          </div>
          <div className={styles.input__group}>
            <label>Descrição</label>
            <Textarea
              id="textarea"
              placeholder="Crie uma descrição para o Desafio"
              value={desafio.descricao}
              onChange={(e) =>
                setDesafio({ ...desafio, descricao: e.target.value })
              }
            />
          </div>
          <div className={styles.button_desafio}>
            <Button id="header" text="Criar Desafio" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
