import axios from 'axios'
import { useEffect, useState } from 'react'

import Header from '../../components/header/header'
import Input from '../../components/form/input/input'
import Button from '../../components/button/button'

import styles from './login.module.scss'

const Login = () => {

  const [login, setLogin] = useState({
    email: '', 
    senha: ''
  })

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5173/login', login)
        setLogin({
          ...login, 
          email: login.email,
          senha: login.senha
        })
        alert(response.data.message)
      }
      catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      handleLogin()
    }, [])

  return (
    <div className={styles.cadastro__individual}>
      <Header/>
      <div className={styles.container_form}>
        <h3>Informe seus dados para realizar o login!</h3>
        <form >
          <Input value={login.email} type='text' placeholder='Insira seu nome' onChange={(e) => setLogin({...login, email: e.target.value})}/>
          <Input value={login.senha} type='password' placeholder='Insira seu e-mail' onChange={(e) => setLogin({...login, senha: e.target.value})}/>
          <Button type='submit' text='Entrar' onClick={handleLogin}/>
        </form>
      </div>
    </div>
  )
}

export default Login
