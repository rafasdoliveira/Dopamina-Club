import { useEffect, useState } from 'react';
import axios from '../../../services/baseService';
import styles from './card.module.scss';
import { FaCalendar, FaLock, FaUnlock, FaUser } from 'react-icons/fa';
import { MdOutlineTextSnippet } from 'react-icons/md';
import Feed from '../../../pages/dashboard/dashboard';

const Card = () => {
  const [desafios, setDesafios] = useState([]);
  const [selectedDesafio, setSelectedDesafio] = useState(null);

  useEffect(() => {
    const fetchDesafios = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8081/desafios/id', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.desafiosEnumerados);
        if (Array.isArray(response.data.desafiosEnumerados)) {
          setDesafios(response.data.desafiosEnumerados);
        } else {
          console.error('Os dados retornados não são um array.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDesafios();
  }, []);

  const handleVerDesafio = (desafio) => {
    setSelectedDesafio(desafio);
  };

  return (
    <div className={styles.card}>
      {desafios.map((desafio) => (
        <div key={desafio.id} className={styles.card__info}>
          <h3 className={styles.card__title}>{desafio.titulo}</h3>
          <div className={styles.card__dates}>
            <FaUser className={styles.icon} />
            <span>{desafio.criado_por.nome}</span>
          </div>
          <div className={styles.card__dates}>
            <FaCalendar className={styles.icon} />
            <span>
              {desafio.data_inicial} a {desafio.data_final}
            </span>
          </div>
          <div className={styles.card__type}>
            {desafio.tipo === 'Privado' ? (
              <FaLock className={styles.icon} />
            ) : (
              <FaUnlock className={styles.icon} />
            )}
            <span>{desafio.tipo}</span>
          </div>
          <div className={styles.card__description}>
            <MdOutlineTextSnippet className={styles.icon} />
            <span>{desafio.descricao}</span>
          </div>
          <button
            className={styles.card__button}
            onClick={() => handleVerDesafio(desafio)}
          >
            Ver Desafio
          </button>
        </div>
      ))}
      {selectedDesafio && <Feed desafio={selectedDesafio} />}
    </div>
  );
};

export default Card;
