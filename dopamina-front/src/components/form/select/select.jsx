/* eslint-disable react/prop-types */
import styles from './select.module.scss';

const Select = ({
  src,
  id,
  value,
  onChange,
  disabled,
  required,
  text,
  options,
}) => {
  return (
    <div className={styles.primarySelect}>
      {src && <img srcSet={src} alt="" />}
      <select
        name={id}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {text}
        </option>
        {options &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
