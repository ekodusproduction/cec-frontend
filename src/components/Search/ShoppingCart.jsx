import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";
import { BsBag } from "react-icons/bs";
import Cart from "../Cart/Cart";
import styles from "./ShoppingCart.module.css";
import Badge from "../Badge/Badge";

const ShoppingCart = () => {
  const showCart = useSelector((state) => state.ui.showCart);
  const dispatch = useDispatch();
  const toggleCart = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <article className={styles["shopping-cart-container"]}>
      <div className={styles.shoppingCart} onClick={toggleCart}>
        <BsBag size={23} />
        <span className={styles.totalItems}>
          <Badge />
        </span>
      </div>
      {showCart && (
        <div className={styles.cartContainer}>
          <div className={styles.backDrop}>
            <div className={styles.modalContainer}>
              <div className={styles.modal}>
                <Cart />
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ShoppingCart;
