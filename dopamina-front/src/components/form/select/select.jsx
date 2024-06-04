/* eslint-disable react/prop-types */
import styles from './select.module.scss';

const Select = ({ src, id, value, onChange, disabled, required, options }) => {
  return (
    <div className={styles.primarySelect}>
      {src && <img srcSet={src} alt="" />}
      <select
        name={id}
        id={id}
        value={value}
        required={required || false}
        onChange={onChange}
        disabled={disabled || false}
      >
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
