import styles from "./Sidebar.module.css";
import { BiBook, BiChevronRight } from "react-icons/bi";
import { useState } from "react";

const Courses = () => {
  const [showCourses, setShowCourses] = useState(false);

  const collapsibleHanlder = () => {
    setShowCourses((prev) => !prev);
  };

  const collapsibleStyles = showCourses
    ? `${styles.collapsible} ${styles["collapsible--exp"]}`
    : styles.collapsible;

  return (
    <div className={collapsibleStyles} onClick={collapsibleHanlder}>
      <div className={styles.collapsibleHead}>
        <BiBook size={20} />
        <p>Courses</p>
      </div>
      <BiChevronRight size={24} className={styles.chevron} />
      <ul className={styles.collapsibleContent}>
        <li>
          <a href="">Test</a>
        </li>
        <li>
          <a href="">Test</a>
        </li>
        <li>
          <a href="">Test</a>
        </li>
        <li>
          <a href="">Test</a>
        </li>
        <li>
          <a href="">Test</a>
        </li>
      </ul>
    </div>
  );
};

export default Courses;
