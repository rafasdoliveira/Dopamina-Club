/* eslint-disable react/prop-types */
// import axios from 'axios'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../../../components/header/header';
import Input from '../../../components/form/input/input';
import Button from '../../../components/button/button';
import { cadastroEmpresa } from '../../../services/apiService';

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

    try {
      const response = await cadastroEmpresa(form);
      setForm({
        ...form,
        nome_fantasia: form.nome_fantasia,
        usuario: form.usuario,
        email: form.email,
        telefone: form.telefone,
        cnpj: form.cnpj,
        senha: form.senha,
      });
      alert(response.data.message);
      navigate('login');
      console.log({ response });
    } catch (error) {
      let errorMessage =
        'Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente mais tarde.';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }

      alert(errorMessage);
      console.log(`Erro ao cadastrar o usuário: ${error}`);
    }
  };

  const InputGroup = ({ label, value, placeholder, src, type, onChange }) => (
    <div className={styles.input__group}>
      <label>{label}</label>
      <Input
        value={value}
        src={src}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );

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
              <h3>Registre sua conta individual!</h3>
              <span>
                Por conta do nosso regulamento, alguns dados são necessários.
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <InputGroup
                label="Nome completo *"
                value={form.nome_fantasia}
                placeholder="Insira seu nome"
                src={UsuarioIcon}
                type="text"
                onChange={(e) =>
                  setForm({ ...form, nome_fantasia: e.target.value })
                }
              />
              <InputGroup
                label="Usuário *"
                value={form.usuario}
                placeholder="Insira um nome de usuário"
                src={UsuarioIcon}
                type="text"
                onChange={(e) => setForm({ ...form, usuario: e.target.value })}
              />
              <InputGroup
                label="CNPJ *"
                value={form.cnpj}
                placeholder="Insira um nome de usuário"
                src={UsuarioIcon}
                type="text"
                onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
              />
              <InputGroup
                label="E-mail *"
                value={form.email}
                placeholder="Insira seu e-mail"
                src={EmailIcon}
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <InputGroup
                label="Telefone *"
                value={form.telefone}
                placeholder="Insira seu telefone"
                src={EmailIcon}
                type="phone"
                onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              />
              <InputGroup
                label="Senha *"
                value={form.senha}
                placeholder="Defina uma senha"
                src={SenhaIcon}
                type="password"
                onChange={(e) => setForm({ ...form, senha: e.target.value })}
              />
              <span>
                <input type="checkbox" />
                Concordo com os{' '}
                <Link>
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
