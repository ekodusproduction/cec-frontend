import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import { Fragment } from "react";
import Search from "../components/Search/Search";
import styles from "./HomeLayout.module.css";

const HomeLayout = () => {
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
          <Search />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeLayout;
