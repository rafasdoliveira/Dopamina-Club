import Button from './components/button/button'
import Header from './components/header/header'
import styles from './styles/global.module.scss'

function App() {
  
  return (
    <>
      <Header/>
      <div className={styles.app}>
          <main>
            <h1>Dopamina Club</h1>
            <p>Promovemos desenvolvimento pessoal, relacionamentos saudáveis e motivação para pessoas e empresas. </p>
          
            <Button id='home' text='Quero fazer parte!'/>
          </main>
      </div>
    </>
  )
}

export default App
