/* eslint-disable react/prop-types */
import styles from './card.module.scss';
import { FaCalendar, FaLock, FaUnlock } from 'react-icons/fa';
import { MdOutlineTextSnippet } from 'react-icons/md';

const Card = ({
  imagem,
  nome,
  dataInicial,
  dataFinal,
  tipo,
  descricao,
  onClickVerDesafio,
}) => {
  return (
    <div className={styles.card}>
      <img src={imagem} alt="" className={styles.card__image} />
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{nome}</h3>
        <div className={styles.card__dates}>
          <FaCalendar className={styles.icon} />
          <span>
            {dataInicial} a {dataFinal}
          </span>
        </div>
        <div className={styles.card__type}>
          {tipo === 'Privado' ? (
            <FaLock className={styles.icon} />
          ) : (
            <FaUnlock className={styles.icon} />
          )}
          <span>{tipo}</span>
        </div>
        <div className={styles.card__description}>
          <MdOutlineTextSnippet className={styles.icon} />
          <span>{descricao}</span>
        </div>
        <button className={styles.card__button} onClick={onClickVerDesafio}>
          Ver Desafio
        </button>
      </div>
    </div>
  );
};

export default Card;
