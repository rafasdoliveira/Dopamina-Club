import { TbWorld } from 'react-icons/tb';
import Button from './components/button/button';
import Header from './components/header/header';
import styles from './styles/global.module.scss';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate('/');
  const handleNavigate = () => {
    navigate('/tipoconta');
  };

  return (
    <>
      <Header />
      <div className={styles.app}>
        <main>
          <h1>Dopamina Club</h1>
          <p>
            Promovemos desenvolvimento pessoal, relacionamentos saudáveis e
            motivação para pessoas e empresas.
          </p>

          <Button
            icon={<TbWorld />}
            id="home"
            text="Quero fazer parte!"
            onClick={handleNavigate}
          />
        </main>
      </div>
    </>
  );
}

export default App;
