/* eslint-disable react/prop-types */
import styles from './input.module.scss';

const Input = ({
  src,
  type,
  id,
  placeholder,
  value,
  onChange,
  disabled,
  required,
}) => {
  const classMap = {
    form: styles.secondaryInput,
    login: styles.tertiaryInput,
    atividade: styles.quarternaryInput,
  };

  const inputClass = classMap[id] || styles.primaryInput;

  return (
    <div className={inputClass}>
      <img srcSet={src} alt="" />
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        required={required ? true : false}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
