import { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderDesafios from '../desafios/headerDesafios/headerDesafios';
import styles from './feed.module.scss';
import Select from '../form/select/select';

const Feed = () => {
  const [desafios, setDesafios] = useState([]);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);

  useEffect(() => {
    const fetchDesafios = async () => {
      const token = sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:8081/desafios/id', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        if (response.data && Array.isArray(response.data.desafiosEnumerados)) {
          setDesafios(response.data.desafiosEnumerados);
        } else {
          console.error('Os dados retornados não são válidos.');
        }
      } catch (error) {
        console.error('Erro ao buscar desafios:', error);
      }
    };
    fetchDesafios();
  }, []);

  const options = desafios.map((desafio) => ({
    value: desafio.titulo,
    label: desafio.titulo,
  }));

  const handleDesafioChange = (selectedOption) => {
    const desafio = desafios.find((d) => d.titulo === selectedOption.value);
    setDesafioSelecionado(desafio);
    console.log(desafio);
  };

  return (
    <div>
      <HeaderDesafios title="Feed" />
      <div className={styles.feed}>
        <div className={styles.feed__header}>
          <span>Selecione um desafio</span>
          <Select options={options} onChange={handleDesafioChange} />
        </div>

        <div className={styles.dados}>
          {desafioSelecionado && (
            <div className={styles.desafio__data}>
              <div>{desafioSelecionado.titulo}</div>
            </div>
          )}
          <div className={styles.atividades}>teste</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
