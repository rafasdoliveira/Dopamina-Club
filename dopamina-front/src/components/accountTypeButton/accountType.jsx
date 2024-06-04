/* eslint-disable react/prop-types */
import styles from './accountType.module.scss';

const AccountType = ({ imgSrc, title, description, onClick }) => {
  return (
    <div className={styles.accountType}>
      <button className={styles.accountDescription} onClick={onClick}>
        <div>
          <span>
            <img src={imgSrc} alt="" />
          </span>
        </div>
        <div>
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </button>
    </div>
  );
};

export default AccountType;
