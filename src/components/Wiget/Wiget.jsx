import styles from "./Wiget.module.css";

const Wiget = ({ heading, value, img }) => {
  return (
    <article className={styles.wiget}>
      <div className={styles.content}>
        <h3 className={styles.heading}>{heading}</h3>
        <p className={styles.value}>{value}</p>
      </div>
      <div className={styles.icon}>
        <img src={img} alt="" />
      </div>
    </article>
  );
};

export default Wiget;
