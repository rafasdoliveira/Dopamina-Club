/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/button/button';
import Input from '../../../components/form/input/input';
import Header from '../../../components/header/header';

import styles from './cadastroIndividual.module.scss';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail, MdPassword } from 'react-icons/md';

const CadastroIndividual = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    usuario: '',
    email: '',
    telefone: '',
    senha: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/usuarios', form);

      alert(response.data.message);
      navigate('/login');
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

  return (
    <div className={styles.cadastro__individual}>
      <Header />
      <div className={styles.container}>
        <div className={styles.chamada}>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum iusto
            a fugit ea sequi dignissimos totam tempora nulla maiores odit,
            expedita ipsum laborum, non neque Quas, blanditiis vero Quia,
            deserunt!
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
              <div className={styles.input__group}>
                <label>Nome completo *</label>
                <Input
                  value={form.nome}
                  icon={<FaUser />}
                  type="text"
                  placeholder="Insira seu nome"
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </div>
              <div className={styles.input__group}>
                <label>Usuário</label>
                <Input
                  value={form.usuario}
                  icon={<FaUser />}
                  type="text"
                  placeholder="Insira um nome de usuário"
                  onChange={(e) =>
                    setForm({ ...form, usuario: e.target.value })
                  }
                />
              </div>
              <div className={styles.input__group}>
                <label>E-mail *</label>
                <Input
                  value={form.email}
                  icon={<MdEmail />}
                  type="email"
                  placeholder="Insira seu e-mail"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className={styles.input__group}>
                <label>Telefone *</label>
                <Input
                  value={form.telefone}
                  icon={<FaPhoneAlt />}
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
                  icon={<MdPassword />}
                  type="password"
                  placeholder="Defina uma senha"
                  onChange={(e) => setForm({ ...form, senha: e.target.value })}
                />
              </div>
              <span>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  Concordo com os{' '}
                  <Link to="/termos-e-condicoes">
                    <strong>termos e condições</strong>
                  </Link>
                </label>
              </span>
              <Button id="form" type="submit" text="Registrar" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroIndividual;
