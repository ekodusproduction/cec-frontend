import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const Cart = () => {
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  let cartElements = <p className={styles.noItem}>Your cart is empty</p>;

  if (cartItems.length !== 0) {
    cartElements = cartItems.map((item, idx) => {
      return (
        <CartItem
          key={Math.random()}
          name={item.name}
          price={item.price}
          id={item.id}
          quantity={item.quantity}
          registrationFees={item.registrationFees}
        />
      );
    });
  }

  const toggleCart = () => {
    dispatch(uiActions.toggleCart());
  };

  const goCheckout = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <section className={styles.shoppingCart}>
      <div className={styles.cartHeader}>
        <p className={styles.totalItems}>Cart ({totalQuantity})</p>
        <p className={styles.close} onClick={toggleCart}>
          <GrClose size={22} />
        </p>
      </div>
      <div className={styles.headingContainer}>
        <h3>Course Name</h3>
        <h3>Course Price</h3>
        <h3>registration fee</h3>
        <h3 className={styles.action}>action</h3>
      </div>
      <div className={styles.cartItems}>{cartElements}</div>
      <div className={styles.total}>
        <p className={styles.totalHeading}>Total</p>
        <p className={styles.totalBill}>₹ {totalPrice.toFixed(2)}</p>
      </div>
      <div className={styles["checkout-btn-container"]} onClick={goCheckout}>
        <Link to="/newstudent/summary">
          {cartItems.length !== 0 ? (
            <Button disabled={cartItems.length === 0}>Checkout</Button>
          ) : (
            <Link to="/newstudent">
              <Button>Continue Adding Courses</Button>
            </Link>
          )}
        </Link>
      </div>
    </section>
  );
};

export default Cart;
