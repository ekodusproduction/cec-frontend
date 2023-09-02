import styles from "./CourseItem.module.css";
import Button from "../Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slices/cartSlice";
import { uiActions } from "../../store/slices/uiSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const CourseItem = ({ item, idx }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isAddedToCart = cartItems.some(
    (cartItem) => cartItem.id === item.courseCode
  );

  const addItemToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.courseCode,
        name: item.courseName,
        price: item.courseFee,
        registrationFees: item.qualificationType.registrationFees,
        courseId: item._id,
      })
    );
    dispatch(uiActions.toggleCart());
    toast.success("Course added to Cart");
  };

  return (
    <article key={item.course_id} className={styles.course}>
      <p>{idx + 1}.</p>
      <div className={styles.courseContent}>
        <p className={styles.courseID}>
          Course Code: <span> {item.courseCode}</span>
        </p>
        <p>
          Course Name: <span> {item.courseName}</span>
        </p>
        <p>
          Course Fees: <span> {item.courseFee}</span>
        </p>

        <p className={styles.courseReg}>
          Registration Fees:
          <span> {item.qualificationType.registrationFees}</span>
        </p>
      </div>
      <Button onClick={addItemToCart} disabled={isAddedToCart}>
        {isAddedToCart ? "Already Added" : "Add to Cart"}
      </Button>
    </article>
  );
};

export default CourseItem;
