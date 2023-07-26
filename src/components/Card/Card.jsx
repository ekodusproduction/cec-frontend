import styles from "./Card.module.css";

const Card = ({ children, className }) => {
  const special = className;
  const cardStyles = special ? `${styles.special} ${styles.card}` : styles.card;
  return <div className={cardStyles}>{children}</div>;
};

export default Card;
