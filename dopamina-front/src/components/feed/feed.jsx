/* eslint-disable react/prop-types */
// import { useState } from 'react';
import styles from './feed.module.scss';
import Atividade from '../atividades/atividade';

const Feed = ({ desafio }) => {
  // const [atividadesEnviadas, setAtividadesEnviadas] = useState([]);
  // const [atividade, setAtividade] = useState('');
  // const [mostrarAtividades, setMostrarAtividades] = useState(true);

  // const handleEnviarAtividade = () => {
  //   setAtividadesEnviadas([...atividadesEnviadas, atividade]);
  //   setAtividade('');
  // };

  return (
    <div className={styles.feedContainer}>
      <div className={styles.sidebar}>
        <button onClick={() => window.history.back()}>Voltar</button>
        <h2>{desafio.nome}</h2>
        <img src={desafio.imagem} alt={desafio.nome} />
        <p>{desafio.descricao}</p>
        <p>Tipo: {desafio.tipo}</p>
        <p>Data Inicial: {desafio.dataInicial}</p>
        <p>Data Final: {desafio.dataFinal}</p>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.enviarAtividade}>
          <Atividade />
        </div>
        {/* {mostrarAtividades && (
          <div className={styles.atividadesEnviadas}>
            <h3>Atividades Enviadas:</h3>
            <ul>
              {atividadesEnviadas.map((ativ, index) => (
                <li key={index}>{ativ}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Feed;
