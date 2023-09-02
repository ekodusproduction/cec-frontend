import styles from "./Button.module.css";

const Button = ({ onClick, children, type, disabled }) => {
  const btnClasses = disabled ? `${styles.btn} ${styles.disabled}` : styles.btn;

  return (
    <button
      type={type}
      className={btnClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
