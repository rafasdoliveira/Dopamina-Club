/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../../components/header/header';
import Input from '../../../components/form/input/input';
import Button from '../../../components/button/button';

import styles from './cadastroEmpresarial.module.scss';

import EmailIcon from '../../../assets/icons/envelope-solid.svg';
import SenhaIcon from '../../../assets/icons/lock-solid.svg';
import UsuarioIcon from '../../../assets/icons/user-solid-2.svg';

const CadastroEmpresarial = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome_fantasia: '',
    usuario: '',
    email: '',
    telefone: '',
    cnpj: '',
    senha: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Formulário enviado:', form);

    try {
      const response = await axios.post('http://localhost:8081/empresas', form);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      let errorMessage =
        'Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente mais tarde.';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      alert(errorMessage);
      console.error('Erro ao cadastrar o usuário:', error);
    }
  };

  return (
    <div className={styles.cadastro__empresarial}>
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
              <h3>Registre sua conta empresarial!</h3>
              <span>
                Por conta do nosso regulamento, alguns dados são necessários.
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.input__group}>
                <label>Nome completo *</label>
                <Input
                  value={form.nome_fantasia}
                  src={UsuarioIcon}
                  type="text"
                  placeholder="Insira seu nome"
                  onChange={(e) =>
                    setForm({ ...form, nome_fantasia: e.target.value })
                  }
                />
              </div>
              <div className={styles.input__group}>
                <label>Usuário *</label>
                <Input
                  value={form.usuario}
                  src={UsuarioIcon}
                  type="text"
                  placeholder="Insira um nome de usuário"
                  onChange={(e) =>
                    setForm({ ...form, usuario: e.target.value })
                  }
                />
              </div>
              <div className={styles.input__group}>
                <label>CNPJ *</label>
                <Input
                  value={form.cnpj}
                  src={UsuarioIcon}
                  type="text"
                  placeholder="Insira seu CNPJ"
                  onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                />
              </div>
              <div className={styles.input__group}>
                <label>E-mail *</label>
                <Input
                  value={form.email}
                  src={EmailIcon}
                  type="email"
                  placeholder="Insira seu e-mail"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className={styles.input__group}>
                <label>Telefone *</label>
                <Input
                  value={form.telefone}
                  src={EmailIcon}
                  type="phone"
                  placeholder="Insira seu telefone"
                  onChange={(e) =>
                    setForm({ ...form, telefone: e.target.value })
                  }
                />
              </div>
              <div className={styles.input__group}>
                <label>Senha *</label>
                <Input
                  value={form.senha}
                  src={SenhaIcon}
                  type="password"
                  placeholder="Defina uma senha"
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                />
              </div>
              <span>
                <input type="checkbox" />
                Concordo com os{' '}
                <Link to="/termos-e-condicoes">
                  <strong>termos e condições</strong>
                </Link>
              </span>
              <Button id="form" type="submit" text="Registrar" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroEmpresarial;
