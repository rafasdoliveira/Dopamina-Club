/* eslint-disable react/prop-types */
import styles from './button.module.scss';

const Button = ({ id, type, text, onClick, icon }) => {
  const classMap = {
    header: styles.secondaryButton,
    home: styles.tertiaryButton,
    form: '',
    atividade: styles.atividadeButton,
    modalCriarDesafio: styles.modalCriarDesafio,
  };

  const buttonClass = classMap[id] || styles.primaryButton;

  return (
    <button
      className={`${buttonClass} ${id === 'header' && styles.loginButton}`}
      id={id}
      type={type}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
