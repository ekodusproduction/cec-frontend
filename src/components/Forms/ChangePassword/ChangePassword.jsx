import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";
import Button from "../../Buttons/Button";
import styles from "../formStyles.module.css";
import { useLocation } from "react-router";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const UserPasswordChangeForm = () => {
  const { state } = useLocation();
  const centerAdminId = state.headOfInstitute._id;
  const centerId = state._id;
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const requestData = { ...values, centerAdminId };
    console.log(requestData);
    try {
      await axios
        .put("/api/center/login/changepassword", requestData, { headers })
        .then(() => {
          toast.success("Password changed!");
          resetForm();
        });
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Link to={`/centers/${centerId}`} className="backLink">
            <BsArrowLeft />
            Go Back
          </Link>
          <section className={styles.formContainer}>
            <Form>
              <section className={styles.section}>
                <h2 className={styles.heading}>
                  Change login password for {state.centerName}
                </h2>
                <article className={styles.container}>
                  <FormField
                    label="New Password"
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter New Password"
                  />

                  <FormField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm New Password"
                  />
                </article>
              </section>

              <div className={styles.btnContainer}>
                <Button type="submit">Submit</Button>
                <Button type="reset">Clear</Button>
              </div>
            </Form>
          </section>
        </>
      )}
    </Formik>
  );
};

export default UserPasswordChangeForm;
