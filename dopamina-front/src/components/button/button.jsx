/* eslint-disable react/prop-types */
import styles from './button.module.scss';

const Button = ({ id, type, text, onClick }) => {
  const classMap = {
    header: styles.secondaryButton,
    home: styles.tertiaryButton,
    form: '',
    atividade: styles.atividadeButton,
  };

  const buttonClass = classMap[id] || styles.primaryButton;

  return (
    <button className={buttonClass} id={id} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
