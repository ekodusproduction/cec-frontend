import FormField from "../FormField";
import Button from "../../Buttons/Button";
import styles from "../formStyles.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  adminMobile: Yup.number()
    .required("Center admin Number is a required ")
    .positive("number can't be negative")
    .test(
      "len",
      "Registration number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
  centerName: Yup.string().required("Center Name is required"),
  centerCode: Yup.string()
    .required("Center Code is required")
    .matches(/^[0-9]{3}$/, "Center Code must be a 3-digit number")
    .notOneOf(["000"], "Center Code cannot be 000"),
  dateofReg: Yup.date()
    .required("Date of Registration is required")
    .max(new Date(), "Date of Registration cannot be in the future"),
  address: Yup.string().required("Postal address of firm is required"),
  landmark: Yup.string().required("Landmark is required"),
  pinCode: Yup.number()
    .required("Pin code is required")
    .positive("number can't be negative")
    .test(
      "len",
      "Pin code must be exactly 6 digits",
      (val) => val && val.toString().length === 6
    ),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
  whatsApp: Yup.number()
    .required("Whatsapp number is required")
    .positive("number can't be negative")
    .test(
      "len",
      "number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
  alternateNumber: Yup.number()
    .positive("number can't be negative")
    .test(
      "len",
      "number must be exactly 10 digits",
      (val) => !val || val.toString().length === 10
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/\.com$/, "Email must end with '.com'"),
});

const initialValues = {
  adminMobile: "",
  centerName: "",
  centerCode: "",
  dateofReg: "",
  address: "",
  landmark: "",
  pinCode: "",
  district: "",
  state: "",
  alternateNumber: "",
  whatsApp: "",
  email: "",
};

const handleCenterNameInput = (e) => {
  e.target.value = e.target.value.toUpperCase();
};

const handleSubmit = async (values, { resetForm }) => {
  try {
    const token = window.localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    await axios.post("/api/center", values, { headers }).then(() => {
      resetForm();
      toast.success("Center added sucessfully");
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

const RegsiterCenter = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <section className={styles.formContainer}>
          <h1 className={styles.heading}>Register Center </h1>
          <Form>
            {/* Firm Details */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Center Details</h2>
              <article className={styles.container}>
                <FormField
                  label="center admin registration number"
                  type="number"
                  name="adminMobile"
                  id="adminMobile"
                  placeholder="enter center admin registration number"
                  isMandetory="true"
                />
                <FormField
                  label="Center Name"
                  type="text"
                  name="centerName"
                  id="centerName"
                  placeholder="Please enter Center Name"
                  isMandetory="true"
                  onInput={handleCenterNameInput}
                />
                <FormField
                  label="Center Code"
                  type="text"
                  name="centerCode"
                  id="centerCode"
                  placeholder="Eg: 008"
                  isMandetory="true"
                />
                <FormField
                  label="Date of Registration"
                  type="date"
                  name="dateofReg"
                  id="dateofReg"
                  isMandetory="true"
                />

                <FormField
                  label="Address"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Please enter address"
                  isMandetory="true"
                />
                <FormField
                  label="Landmark"
                  type="text"
                  name="landmark"
                  id="landmark"
                  placeholder="Please enter landmark"
                  isMandetory="true"
                />

                <FormField
                  label="Pin Code"
                  type="number"
                  name="pinCode"
                  id="pinCode"
                  placeholder="Please enter pin code"
                  isMandetory="true"
                />

                <FormField
                  label="District"
                  type="text"
                  name="district"
                  id="district"
                  placeholder="Please enter district"
                  isMandetory="true"
                />

                <FormField
                  label="State"
                  type="text"
                  name="state"
                  id="state"
                  placeholder="Please enter state"
                  isMandetory="true"
                />
              </article>
            </section>

            {/* Communication Details of Firms */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>
                Communication Details of Firms
              </h2>
              <article className={styles.container}>
                <FormField
                  label="whatsApp Number"
                  type="number"
                  name="whatsApp"
                  id="whatsApp"
                  placeholder="Please enter whatsApp Number"
                  isMandetory="true"
                />
                <FormField
                  label="Alternate Number"
                  type="number"
                  name="alternateNumber"
                  id="alternateNumber"
                  placeholder="Please enter alternate number"
                />

                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Please enter email address"
                  isMandetory="true"
                />
              </article>
            </section>

            {/* Button to transition over previous part and submit */}
            <div className={styles.btnContainer}>
              <Button type="submit">Submit</Button>
              <Button type="reset">Clear</Button>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default RegsiterCenter;
