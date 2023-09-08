import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";
import Button from "../../Buttons/Button";
import styles from "../formStyles.module.css";
import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  courseName: Yup.string().required("Please enter course name"),
  courseCode: Yup.string()
    .required("Please enter course code")
    .length(5, "Course code must be exactly 5 characters"),
  qualificationType: Yup.string().required("Please enter qualification type"),
  courseFee: Yup.number()
    .required("Please enter course fee")
    .min(0, "Course fee cannot be negative"),
  courseDescription: Yup.string().required("Please enter course description"),
  duration: Yup.number()
    .required("Please enter course duration")
    .moreThan(0, "Duration must be greater than 0"),
});

const CourseForm = () => {
  const [qualifications, setQualifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response1 = await axios.get("/api/qualification", { headers });
        const response2 = await axios.get("/api/category", {
          headers,
        });

        setQualifications(response1.data.data);
        setCategories(response2.data.data);
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("/api/course", values, { headers }).then(() => {
        toast.success("Course added successfully");
        resetForm();
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {qualifications && categories && !isLoading && (
        <section className={styles.formContainer}>
          <h1 className={styles.heading}>Register Course</h1>
          <Formik
            initialValues={{
              courseName: "",
              courseCode: "",
              // category: "",
              qualificationType: "",
              courseFee: "",
              courseDescription: "",
              duration: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              resetForm,
            }) => (
              <Form>
                <section className={styles.section}>
                  <h2 className={styles.sectionHeading}>
                    Basic Course Details
                  </h2>
                  <article className={styles.container}>
                    <FormField
                      label="Course Name"
                      placeholder="Please enter course name"
                      type="text"
                      name="courseName"
                      id="courseName"
                      isMandetory="true"
                    />

                    <FormField
                      label="Course Code"
                      placeholder="Please enter course code"
                      type="text"
                      name="courseCode"
                      id="courseCode"
                      isMandetory="true"
                    />

                    {/* Course Category */}
                    {/* <div className={styles.formControl}>
                      <label htmlFor="category">
                        Category
                        <span className={styles.important}>*</span>
                      </label>
                      <select
                        name="category"
                        id="category"
                        values={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          errors.category && touched.category
                            ? styles.error
                            : ""
                        }`}
                      >
                        <option value=""> Select a category </option>
                        {categories.map((item) => (
                          <option key={item["_id"]} value={item["_id"]}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                      {errors.category && touched.category && (
                        <span className={styles.errorText}>
                          {errors.category}
                        </span>
                      )}
                    </div> */}

                    <div className={styles.formControl}>
                      <label htmlFor="qualificationType">
                        Qualification Type
                        <span className={styles.important}>*</span>
                      </label>
                      <select
                        name="qualificationType"
                        id="qualificationType"
                        values={values.qualificationType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          errors.qualificationType && touched.qualificationType
                            ? styles.error
                            : ""
                        }`}
                      >
                        <option value=""> Select a qualification type</option>
                        {qualifications.map((item) => (
                          <option key={item["_id"]} value={item["_id"]}>
                            {item.qualification}
                          </option>
                        ))}
                      </select>

                      {errors.qualificationType &&
                        touched.qualificationType && (
                          <span className={styles.errorText}>
                            {errors.qualificationType}
                          </span>
                        )}
                    </div>

                    <FormField
                      label="Course Fee"
                      placeholder="Please enter course fee"
                      type="number"
                      name="courseFee"
                      id="courseFee"
                      isMandetory="true"
                    />

                    <FormField
                      label="Course Description"
                      placeholder="Please enter course description"
                      type="text"
                      name="courseDescription"
                      id="courseDescription"
                      isMandetory="true"
                    />

                    <FormField
                      label="Duration (Months)"
                      placeholder="Please enter course duration"
                      type="number"
                      name="duration"
                      id="duration"
                      isMandetory="true"
                    />
                  </article>
                </section>

                <div className={styles.btnContainer}>
                  <Button type="submit">Submit</Button>
                  <Button type="reset">Clear</Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      )}
    </>
  );
};

export default CourseForm;
