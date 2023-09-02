import React, { useState } from "react";
import styles from "./ImageSlider.module.css";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles["slider-container"]}>
      <div className="slide">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className={styles.image}
        />
      </div>
      <button className={styles["prev-button"]} onClick={goToPrevSlide}>
        Prev
      </button>
      <button className={styles["next-button"]} onClick={goToNextSlide}>
        Next
      </button>
    </div>
  );
};

export default ImageSlider;
