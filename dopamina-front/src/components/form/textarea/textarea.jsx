/* eslint-disable react/prop-types */
import styles from './textarea.module.scss';

const Textarea = ({
  icon,
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

  const textareaClass = classMap[id] || styles.primaryInput;

  return (
    <div className={textareaClass}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <textarea
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Textarea;
