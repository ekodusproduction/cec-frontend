import styles from "./Search.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";
import { cartActions } from "../../store/slices/cartSlice";
import ShoppingCart from "./ShoppingCart";
import { useNavigate } from "react-router";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { setAuth } = useAuth();
  const data = useLocation();

  const logoutHandler = () => {
    setAuth(null);
    navigate("/login");
    dispatch(cartActions.emptyCart());
    window.localStorage.removeItem("accessToken");
  };

  const sideChangeHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const modalToggleHandler = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={styles.home}>
      <section className={styles.searchbarContainer}>
        <GiHamburgerMenu
          size={23}
          className={styles.hamburger}
          onClick={sideChangeHandler}
        />

        <p className={styles.logo}>/</p>

        <div className={styles.cartContainer}>
          <ShoppingCart />
          <img
            className={styles.userImage}
            src="/images/use.png"
            alt="user image"
            onClick={modalToggleHandler}
          />
          {showModal && (
            <div className={styles.logout} onClick={logoutHandler}>
              Logout
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;
