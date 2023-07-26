import styles from "./Search.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";

const Search = () => {
  const dispatch = useDispatch();

  const sideChangeHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <div className={styles.home}>
      <section className={styles.searchbarContainer}>
        <GiHamburgerMenu
          size={23}
          className={styles.hamburger}
          onClick={sideChangeHandler}
        />
        <form className={styles.inputContainer}>
          <label htmlFor="search">
            <FiSearch size={23} className={styles.searchIcon} />
          </label>
          <input
            className={styles.search}
            type="text"
            placeholder="Search..."
            id="search"
          />
        </form>
        <img
          className={styles.userImage}
          src="/images/use.png"
          alt="user image"
        />
      </section>
    </div>
  );
};

export default Search;
