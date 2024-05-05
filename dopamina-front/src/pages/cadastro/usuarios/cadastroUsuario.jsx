import axios from 'axios'
import { useState } from 'react';

import Header from '../../../components/header/header';
import Input from '../../../components/form/input/input';
import { PhoneInput } from 'react-international-phone';
import Button from '../../../components/button/button';

import styles from './cadastroIndividual.module.scss'
import 'react-international-phone/style.css';

const CadastroIndividual = () => {
  
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8081/usuarios', form)
      setForm({
        ...form,
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        senha: form.senha
      })

      alert(response.data.message)
      console.log({ response })
    }
    catch(error) {
      let errorMessage = 'Ocorreu um erro ao cadastrar usuário. Por favor, tente novamente mais tarde.';

      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      
      alert(errorMessage);
      console.log(`Erro ao cadastrar o usuário: ${error}`);
    } 
  }

  return (
    <div className={styles.cadastro__individual}>
      <Header/>
      <div className={styles.container_form}>
        <h3>Registre sua conta individual!</h3>
        <p>Preenche o formulário para começar.</p>
        <form onSubmit={handleSubmit}>
          <Input value={form.nome} type='text' placeholder='Insira seu nome' onChange={(e) => setForm({...form, nome: e.target.value})}/>
          <Input value={form.email} type='email' placeholder='Insira seu e-mail' onChange={(e) => setForm({...form, email: e.target.value})}/>
          <PhoneInput value={form.telefone} defaultCountry="br" onChange={(value) => setForm({...form, telefone: value})}/>
          <Input value={form.senha} type='password' placeholder='Defina uma senha senha' onChange={(e) => setForm({...form, senha: e.target.value})} />
          <Button type='submit' text='Registrar' />
        </form>
      </div>
    </div>
  )
}

export default CadastroIndividual
