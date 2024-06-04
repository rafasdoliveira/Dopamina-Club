import { useState } from 'react';
import Card from '../card/card';
import Feed from '../../feed/feed';
import styles from './meusDesafios.module.scss';
import HeaderDesafios from '../headerDesafios/headerDesafios';

const MeusDesafios = () => {
  const [selectedDesafio, setSelectedDesafio] = useState(null);

  const desafio = {
    imagem: 'img',
    nome: 'Desafio Unifor 2024',
    dataInicial: '01/05/2024',
    dataFinal: '31/05/2024',
    tipo: 'Público',
    descricao: 'Descrição do Desafio...',
  };

  const handleVerDesafio = (desafio) => {
    setSelectedDesafio(desafio);
  };

  return (
    <div className={styles.meus_desafios_container}>
      <div className={styles.desafiosHeader}>
        <HeaderDesafios title="Meus Desafios" />
      </div>
      {selectedDesafio ? (
        <Feed desafio={selectedDesafio} />
      ) : (
        <div className={styles.meus_desafios}>
          {[...Array(5)].map((_, index) => (
            <Card
              key={index}
              imagem={desafio.imagem}
              nome={desafio.nome}
              dataInicial={desafio.dataInicial}
              dataFinal={desafio.dataFinal}
              tipo={desafio.tipo}
              descricao={desafio.descricao}
              onClickVerDesafio={() => handleVerDesafio(desafio)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MeusDesafios;
