import styles from "./Badge.module.css";
import { useSelector } from "react-redux";

const Badge = () => {
  const totalItems = useSelector((state) => state.cart.totalQuantity);
  return <span className={styles.total}>{totalItems}</span>;
};

export default Badge;
