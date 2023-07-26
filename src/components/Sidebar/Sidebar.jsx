import React from "react";
import styles from "./Sidebar.module.css";
import { getSidebarData, extraData } from "../../constants/index";
import { NavLink } from "react-router-dom";
import { BiSolidChevronLeft } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.showSidebar);
  const sidebarData = getSidebarData("super");
  const activeRouteHandler = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const toggleSidebar = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const sidebarStyles = show
    ? `${styles.sidebar} ${styles.active}`
    : styles.sidebar;

  const backdropStyles = show ? styles.backdrop : "";

  return (
    <>
      <section className={sidebarStyles}>
        <header className={styles.user}>
          <img
            src="/images/use.png"
            alt="user photo"
            className={styles.uImage}
          />
          <h2 className={styles.uName}>Super admin</h2>
          <BiSolidChevronLeft
            size={35}
            className={styles.chevron}
            onClick={toggleSidebar}
          />
        </header>
        <section className={styles.container}>
          <h2 className={styles.sectionHeading}>Navigation</h2>
          <ul>
            {sidebarData.map((item) => (
              <li key={Math.random()}>
                <NavLink to={item.link} className={activeRouteHandler}>
                  <item.icon size={20} />
                  <p>{item.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.container}>
          <h2 className={styles.sectionHeading}>Extras</h2>
          <ul>
            {extraData.map((item) => (
              <li key={Math.random()}>
                <NavLink to={item.link} className={activeRouteHandler}>
                  <p>{item.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <div className={backdropStyles}></div>
    </>
  );
};

export default Sidebar;
