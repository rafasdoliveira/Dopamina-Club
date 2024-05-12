// import axios from 'axios'
import { useState } from 'react';

import Header from '../../../components/header/header'
import Input from '../../../components/form/input/input'
import Button from '../../../components/button/button'
import { PhoneInput } from 'react-international-phone';
import { cadastroEmpresa } from '../../services/apiService';

import styles from './cadastroEmpresarial.module.scss'

const CadastroEmpresarial = () => {

  const [form, setForm] = useState({
    nome_fantasia: '',
    email: '',
    telefone: '',
    cnpj: '',
    senha: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await cadastroEmpresa(form)
        setForm({
          ...form,
          nome_fantasia: form.nome_fantasia,
          email: form.email,
          telefone: form.telefone,
          cnpj: form.cnpj,
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
    <div className={styles.cadastro__empresarial}>
      <Header/>
      <div className={styles.container_form}>
        <h3>Registre sua conta corporativa!</h3>
        <p>Preenche o formulário para começar.</p>
        <form onSubmit={handleSubmit}>
          <Input value={form.nome_fantasia} type='text' placeholder='Insira o Nome Fantasia' onChange={(e) => setForm({...form, nome_fantasia: e.target.value})} />
          <Input value={form.email} type='email' placeholder='Insira seu e-mail' onChange={(e) => setForm({...form, email: e.target.value})}/>
          <PhoneInput value={form.telefone} defaultCountry="br" onChange={(value) => setForm({...form, telefone: value})}/>
          <Input value={form.cnpj} type='text' placeholder='Insira seu CNPJ' onChange={(e) => setForm({...form, cnpj: e.target.value})}/>
          <Input value={form.senha} type='password' placeholder='Confirma sua senha senha' onChange={(e) => setForm({...form, senha: e.target.value})}/>
          <Button type='submit' text='Registrar' />
        </form>
      </div>
    </div>
  )
}

export default CadastroEmpresarial
