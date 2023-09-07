import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { uiActions } from "../../store/slices/uiSlice";
import { cartActions } from "../../store/slices/cartSlice";
import Button from "../../components/Buttons/Button";
import NewStudent from "../../components/Forms/NewStudent/NewStudent";
import styles from "./Summary.module.css";

const Summary = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const centerCode = localStorage.getItem("centerCode");
  const qualification = cart.qualification;
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  const courses = cart.items.map((item) => {
    return item.courseId;
  });

  const initialValues = {
    centerCode,
    firstName: "",
    lastName: "",
    DOB: "",
    mobile: "",
    pinCodePresent: "",
    presentAddress: "",
    cityPresent: "",
    statePresent: "",
    // permanentAddress: "",
    // statePermanent: "",
    // cityPermanent: "",
    // pinCodePermanent: "",
  };

  const dynamicValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter the First Name"),
    lastName: Yup.string().required("Please enter last Name"),
    DOB: Yup.date()
      .required("Please enter the DOB")
      .test("age", "Student can't be less than 16 years old", (date) => {
        const cutoffDate = new Date();
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 16);
        return date <= cutoffDate;
      }),
    mobile: Yup.number()
      .required("Please enter Mobile Number")
      .min(1, "Phone number can't be negative")
      .test(
        "len",
        "Mobile number must be exactly 10 digits",
        (val) => val && val.toString().length === 10
      ),
    pinCodePresent: Yup.number()
      .required("Please enter Present Pin Code")
      .min(1, "Pin Code can't be negative")
      .test(
        "len",
        "Pin code must be exactly 6 digits",
        (val) => val && val.toString().length === 6
      ),
    presentAddress: Yup.string().required("Please enter Present Address"),
    cityPresent: Yup.string().required("Please enter present city!"),
    statePresent: Yup.string().required("Please enter present state"),
    // permanentAddress: Yup.string().required("Please enter Permanent Address"),
    // statePermanent: Yup.string().required("Please enter Permanent state"),
    // cityPermanent: Yup.string().required("Please enter City"),
    // pinCodePermanent: Yup.number()
    //   .required("Please enter Permanent Pin Code")
    //   .min(1, "Pin Code can't be negative")
    //   .test(
    //     "len",
    //     "Pin code must be exactly 6 digits",
    //     (val) => val && val.toString().length === 6
    //   ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const data = { ...values, qualification, courses };
    console.log(data);
    const apiUrl = "/api/student/center";

    console.log(apiUrl);

    try {
      await axios.post(apiUrl, data, { headers }).then(() => {
        toast.success("Student Registration done successfully!");
        resetForm();
        dispatch(cartActions.emptyCart());
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const cartValid = cart.items.length !== 0;
    if (!cartValid) {
      navigate("/newstudent");
      dispatch(uiActions.toggleCart());
    }
  }, [cart]);

  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={dynamicValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.summaryPageContainer}>
          <section className={styles.formContainer}>
            <h2 className={styles.heading}>Register student</h2>
            <NewStudent />
          </section>
          <article className={styles.summaryContainer}>
            <h3 className={styles.heading}>Summary</h3>
            <div className={styles.headingContainer}>
              <h3 className={styles.courseName}>Course Name</h3>
              <h3 className={styles.courseFee}>Course Fees</h3>
              <h3 className={styles.registrationFees}>Registration Fees</h3>
            </div>
            <div className={styles.courseContainer}>
              {cart.items.map((course, idx) => {
                return (
                  <div className={styles.course} key={course.id}>
                    <p>
                      {idx + 1}. {course.name}
                    </p>
                    <p className={styles["price__money"]}>
                      ₹{course.price.toFixed(2)}
                    </p>
                    <p className={styles["price__money"]}>
                      ₹{course.registrationFees.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className={styles.priceContainer}>
              <p className={styles["price__type"]}>TOTAL</p>
              <span className={styles["price__money"]}>
                ₹{cart.totalPrice.toFixed(2)}
              </span>
            </div>
            <Button type="submit">PAY</Button>
          </article>
        </Form>
      </Formik>
    </section>
  );
};

export default Summary;
