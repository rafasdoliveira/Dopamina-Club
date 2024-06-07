import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/card';
import HeaderDesafios from '../headerDesafios/headerDesafios';
import styles from './desafiosPublicos.module.scss';

const DesafiosPublicos = () => {
  const [desafios, setDesafios] = useState([]);

  useEffect(() => {
    const fetchDesafios = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8081/desafios/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.desafiosEnumerados);
        if (Array.isArray(response.data.desafiosEnumerados)) {
          const desafiosPublicos = response.data.desafiosEnumerados.filter(
            (desafio) =>
              desafio.tipo &&
              (desafio.tipo.toLowerCase() === 'público' ||
                desafio.tipo.toLowerCase() === 'publico'),
          );
          setDesafios(desafiosPublicos);
        } else {
          console.error('Os dados retornados não são um array.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDesafios();
  }, []);

  return (
    <div className={styles.meus_desafios_container}>
      <div className={styles.desafiosHeader}>
        <HeaderDesafios title="Desafios Públicos" />
      </div>

      <div className={styles.meus_desafios}>
        {desafios.map((desafio, index) => (
          <Card
            key={index}
            nome={desafio.nome}
            dataInicial={desafio.dataInicial}
            dataFinal={desafio.dataFinal}
            tipo={desafio.tipo}
            descricao={desafio.descricao}
          />
        ))}
      </div>
    </div>
  );
};

export default DesafiosPublicos;
