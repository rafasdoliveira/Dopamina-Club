import Card from '../card/card';
import HeaderDesafios from '../headerDesafios/headerDesafios';
import styles from './meusDesafios.module.scss';

const MeusDesafios = () => {
  return (
    <div className={styles.meus_desafios_container}>
      <div className={styles.desafiosHeader}>
        <HeaderDesafios title="Meus Desafios" />
      </div>

      <div className={styles.meus_desafios}>
        <Card />
      </div>
    </div>
  );
};

export default MeusDesafios;
