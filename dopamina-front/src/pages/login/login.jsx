/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button/button';
import Input from '../../components/form/input/input';
import Header from '../../components/header/header';

import styles from './login.module.scss';
import { MdEmail, MdPassword } from 'react-icons/md';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    senha: '',
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', login);
      console.log(response);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      let errorMessage =
        'Ocorreu um erro ao realizar o login. Por favor, tente novamente mais tarde.';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      alert(errorMessage);
      console.log(`Erro ao logar: ${error}`);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.container_form}>
          <div className={styles.text}>
            <h4>Informe seus dados para realizar o login!</h4>
          </div>
          <form onSubmit={handleLogin}>
            <div className={styles.input__group}>
              <label>E-mail</label>
              <Input
                value={login.email}
                icon={<MdEmail />}
                type="text"
                placeholder="Insira seu e-mail"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
            </div>
            <div className={styles.input__group}>
              <label>Senha</label>
              <Input
                value={login.senha}
                icon={<MdPassword />}
                type="password"
                placeholder="Insira sua senha"
                onChange={(e) => setLogin({ ...login, senha: e.target.value })}
              />
            </div>
            <div className={styles.button}>
              <Button type="submit" text="Entrar" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
