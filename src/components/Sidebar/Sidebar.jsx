import React from "react";
import styles from "./Sidebar.module.css";
import { getSidebarData } from "../../constants/index";
import { NavLink } from "react-router-dom";
import { BiSolidChevronLeft } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/slices/uiSlice";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const show = useSelector((state) => state.ui.showSidebar);
  const isSuper = auth.data.isSuperAdmin ? "Super" : "Center";
  const sidebarData = getSidebarData(isSuper);
  const activeRouteHandler = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  const toggleSidebar = () => {
    dispatch(uiActions.toggleSidebar());
  };

  const sidebarStyles = show
    ? `${styles.sidebar} ${styles.active}`
    : styles.sidebar;

  return (
    <>
      <section className={sidebarStyles}>
        <header className={styles.user}>
          <img
            src="/images/use.png"
            alt="user photo"
            className={styles.uImage}
          />
          <h2 className={styles.uName}>{isSuper} admin</h2>
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
      </section>
      <div className={`${show ? styles.backdrop : ""}`}></div>
    </>
  );
};

export default Sidebar;
