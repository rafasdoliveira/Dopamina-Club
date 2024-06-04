// import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './perfil.module.scss';
import { MdEdit, MdCancel, MdOutlineDoneAll } from 'react-icons/md';

const Perfil = () => {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  // Função para definir dados mockados
  const handleUsuario = async () => {
    const mockData = {
      nome: 'Rafael Oliveira',
      email: 'rafasdoliveira@outlook.com',
      telefone: '+55 85 9 9799-5271',
      senha: '********',
      usuario: 'rafasdoliveira',
      profileImage: 'path/to/profileImage.jpg',
      coverImage: 'path/to/coverImage.jpg',
    };
    setUserData(mockData);
    setProfileImage(mockData.profileImage);
    setCoverImage(mockData.coverImage);
    setEditedData(mockData);
    console.log(mockData);
  };

  useEffect(() => {
    handleUsuario();
  }, []);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setEditedData({ ...editedData, profileImage: imageUrl });
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setEditedData({ ...editedData, coverImage: imageUrl });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // await axios.put('http://localhost:8081/usuarios/47', editedData);
      setUserData(editedData);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      {userData && (
        <div className={styles.profileContent}>
          <div className={styles.coverImageContainer}>
            {coverImage && (
              <img
                src={coverImage}
                alt="Foto de capa"
                className={styles.coverImage}
              />
            )}
            {isEditing && (
              <input
                type="file"
                onChange={handleCoverImageChange}
                className={styles.fileInput}
              />
            )}
          </div>
          <div className={styles.profileImageContainer}>
            {profileImage && (
              <img
                src={profileImage}
                alt="Foto de perfil"
                className={styles.profileImage}
              />
            )}
            {isEditing && (
              <input
                type="file"
                onChange={handleProfileImageChange}
                className={styles.fileInput}
              />
            )}
          </div>
          <div className={styles.userInfo}>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="nome"
                  value={editedData.nome}
                  onChange={handleInputChange}
                />
              ) : (
                <span>Nome: {userData.nome}</span>
              )}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>Email: {userData.email}</span>
              )}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="telefone"
                  value={editedData.telefone}
                  onChange={handleInputChange}
                />
              ) : (
                <span>Telefone: {userData.telefone}</span>
              )}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="password"
                  name="senha"
                  value={editedData.senha}
                  onChange={handleInputChange}
                />
              ) : (
                <span>Senha: {userData.senha}</span>
              )}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="usuario"
                  value={editedData.usuario}
                  onChange={handleInputChange}
                />
              ) : (
                <span>Usuário: {userData.usuario}</span>
              )}
            </div>
          </div>
          <button onClick={handleEdit}>
            {isEditing ? <MdCancel /> : <MdEdit />}
          </button>
          {isEditing && (
            <button onClick={handleSave}>
              <MdOutlineDoneAll />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Perfil;
