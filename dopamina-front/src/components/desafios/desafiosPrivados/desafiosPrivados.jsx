import Card from '../card/card';
import HeaderDesafios from '../headerDesafios/headerDesafios';
import styles from './desafiosPrivados.module.scss';

const DesafiosPublicos = () => {
  const desafio = {
    imagem: 'img',
    nome: 'Desafio dos Amigos',
    dataInicial: '01/05/2024',
    dataFinal: '31/05/2024',
    tipo: 'Privado',
    descricao: 'Descrição do Desafio...',
  };

  return (
    <div className={styles.meus_desafios_container}>
      <div className={styles.desafiosHeader}>
        <HeaderDesafios title="Desafios Privados" />
      </div>

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
          />
        ))}
      </div>
    </div>
  );
};

export default DesafiosPublicos;