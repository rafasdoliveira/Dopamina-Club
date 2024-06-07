import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Card from '../card/card';
import Feed from '../../feed/feed';
import styles from './meusDesafios.module.scss';
import HeaderDesafios from '../headerDesafios/headerDesafios';

const MeusDesafios = () => {
  const [selectedDesafio, setSelectedDesafio] = useState(null);
  const [desafios, setDesafios] = useState([]);

  useEffect(() => {
    const fetchDesafios = async () => {
      try {
        const response = await axios.get('http://localhost:8081/desafios/id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);
        console.log(response.data.desafiosEnumerados);
        if (Array.isArray(response.data.desafiosEnumerados)) {
          setDesafios(response.data.desafiosEnumerados);
        } else {
          console.error('Os dados retornados não são um array.');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDesafios();
  }, []);

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
          {desafios.map((desafio, index) => (
            <Card
              key={index}
              nome={desafio.titulo}
              dataInicial={format(new Date(desafio.data_inicial), 'dd/MM/yyyy')}
              dataFinal={format(new Date(desafio.data_final), 'dd/MM/yyyy')}
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
