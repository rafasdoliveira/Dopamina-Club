import axios from 'axios';
import { useState } from 'react';

import Button from '../../components/button/button';
import Input from '../../components/form/input/input';
import Header from '../../components/header/header';

import styles from './login.module.scss';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    senha: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login', login);
      setLogin({
        ...login,
        email: login.email,
        senha: login.senha,
      });
      alert(response.data.message);
      setLogin({ email: '', senha: '' });
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
    <div className={styles.cadastro__individual}>
      <Header />
      <div className={styles.container_form}>
        <h3>Informe seus dados para realizar o login!</h3>
        <form onSubmit={handleLogin}>
          <Input
            value={login.email}
            type="text"
            placeholder="Insira seu e-mail"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <Input
            value={login.senha}
            type="password"
            placeholder="Insira sua senha"
            onChange={(e) => setLogin({ ...login, senha: e.target.value })}
          />
          <Button type="submit" text="Entrar" />
        </form>
      </div>
    </div>
  );
};

export default Login;
