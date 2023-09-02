import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/slices/cartSlice";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const CartItem = (props) => {
  const { id, registrationFees, price, name } = props;
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(cartActions.removeItemFromCart(id));
    toast.error("Course is removed from the cart sucessfully");
  };

  return (
    <article className={styles.product}>
      <div className={styles.infoContainer}>
        <div className={styles.infoContent}>
          <p className={styles.name}>{name}</p>
        </div>
        <p className={styles.price}>₹ {price.toFixed(2)}</p>
        <p className={styles.register}>₹ {registrationFees.toFixed(2)}</p>
        <div className={styles.actions}>
          <FaTrash onClick={removeItemFromCart} />
        </div>
      </div>
    </article>
  );
};

export default CartItem;
