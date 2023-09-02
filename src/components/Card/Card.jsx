import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { data } from "../../constants";
import axios from "axios";

const Card = () => {
  const [sliderValue, setSliderValue] = useState(false);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.checked);
  };

  const sliderStyles = `${styles.slider} ${styles.round}`;

  return (
    <>
      {data.map((item, idx) => (
        <article key={idx} className={styles.card}>
          <div className={styles.header}>
            <Link to="/" className={styles.view}>
              view
            </Link>
            <label className={styles.switch}>
              <input type="checkbox" onChange={handleSliderChange} />
              <span className={sliderStyles}></span>
            </label>
          </div>
          <div className={styles.content}>
            <img src={item.image} alt="" className={styles.image} />
            <h3 className={styles.name}>{item.name}</h3>
            <h4 className={styles.number}>{item.number}</h4>
            <p className={styles.date}>{item.date}</p>
          </div>
          <div className={styles.detailsContainer}>
            {item.extra.map((item) => {
              return (
                <div key={item.title} className={styles.details}>
                  <span>{item.quantity}</span>
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </>
  );
};

export default Card;
