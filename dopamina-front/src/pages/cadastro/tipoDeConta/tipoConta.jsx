/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/header/header';

import styles from './tipoConta.module.scss';
import User from '../../../assets/icons/userPoly.svg';
import Business from '../../../assets/icons/businessPoly.svg';
import AccountType from '../../../components/accountTypeButton/accountType';

const TipoConta = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.tipo__conta}>
      <Header />
      <div className={styles.container}>
        <div className={styles.chamada}>
          <span>
            Todos são peças importantes no trabalho em equipe, cada um
            representa uma pequena parcela do resultado final, quando um falha,
            todos devem se unir para sua reconstrução.
          </span>
        </div>
        <div className={styles.form}>
          <div className={styles.form__container}>
            <div className={styles.text}>
              <h3>Cadastre-se!</h3>
              <span>
                Para iniciar essa jornada, nos conte qual tipo de conta você
                deseja cadastrar.
              </span>
            </div>
            <div className={styles.accountType}>
              <AccountType
                imgSrc={User}
                title="Individual"
                description="Conta pessoal para criar e participar de desafios."
                onClick={() => handleNavigate('/cadastrousuario')}
              />
              <AccountType
                imgSrc={Business}
                title="Empresarial"
                description="Crie desafios dinâmicos e personalizados para sua empresa."
                onClick={() => handleNavigate('/cadastroempresa')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipoConta;
