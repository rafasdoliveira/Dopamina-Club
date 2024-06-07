import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './perfil.module.scss';
import { MdEdit, MdCancel, MdDoneAll } from 'react-icons/md';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserAlt } from 'react-icons/fa';
import Input from '../form/input/input';

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/usuarios/me`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        console.log(response);
        setUserData(response.data);
        setEditedData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = async () => {
    const response = await axios.put(
      `http://localhost:8081/usuarios/${userData.id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      },
    );
    console.log(response);
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8081/usuarios/me', editedData);
      setUserData(editedData);
      setEditedData(null);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.profileContainer}>
      {userData && (
        <div className={styles.profileContent}>
          <div className={styles.userInfo}>
            <div className={styles.input__group}>
              <label>Nome completo</label>
              <Input
                value={isEditing ? editedData.nome : userData.nome}
                icon={<FaUser />}
                type="text"
                id="nome"
                placeholder="Insira seu nome"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input__group}>
              <label>Usuário</label>
              <Input
                value={isEditing ? editedData.usuario : userData.usuario}
                icon={<FaUserAlt />}
                type="text"
                id="usuario"
                placeholder="Insira seu usuário"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input__group}>
              <label>Email</label>
              <Input
                value={isEditing ? editedData.email : userData.email}
                icon={<FaEnvelope />}
                type="text"
                id="email"
                placeholder="Insira seu email"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input__group}>
              <label>Telefone</label>
              <Input
                value={isEditing ? editedData.telefone : userData.telefone}
                icon={<FaPhone />}
                type="text"
                id="telefone"
                placeholder="Insira seu telefone"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className={styles.input__group}>
              <label>Senha</label>
              <Input
                value={isEditing ? editedData.senha : '********'}
                icon={<FaLock />}
                type="password"
                id="senha"
                placeholder="Insira sua senha"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className={styles.perfilButtons}>
            {!isEditing && (
              <button onClick={handleEdit}>
                <MdEdit />
              </button>
            )}
            {isEditing && (
              <>
                <button onClick={handleSave}>
                  <MdDoneAll />
                </button>
                <button onClick={() => setIsEditing(false)}>
                  <MdCancel />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
