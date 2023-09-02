import FormField from "../FormField";
import Button from "../../Buttons/Button";
import styles from "../formStyles.module.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  adminName: Yup.string().required("Center Admin Name is a required Field"),
  mobile: Yup.number()
    .required("Mobile number is required")
    .positive("Mobile Number can't be negative")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters long"),
  address: Yup.string().required("Permanent address is required"),
  pinCode: Yup.number()
    .required("Permanent pin code is required")
    .positive("Pin Code can't be negative")
    .test(
      "len",
      "Pin code must be exactly 6 digits",
      (val) => val && val.toString().length === 6
    ),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/\.com$/, "Email must end with '.com'"),
  alternateNumber: Yup.number()
    .positive("Alternate Number can't be Negative")
    .test(
      "len",
      "Alternate number must be exactly 10 digits",
      (val) => !val || (val && val.toString().length === 10)
    ),
});

const addCenterAdmin = () => {
  const initialValues = {
    adminName: "",
    mobile: "",
    password: "",
    address: "",
    pinCode: "",
    district: "",
    state: "",
    email: "",
    alternateNumber: "",
  };

  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      await axios.post("/api/centeradmin", values, { headers }).then(() => {
        toast.success("Registered center admin successfully");
        resetForm();
      });
    } catch (error) {
      console.log(error);
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
        <section className={styles.formContainer}>
          <h1 className={styles.heading}>Register Center Admin</h1>
          <Form>
            {/* Enter Center Owner Details */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Enter basic Details</h2>
              <article className={styles.container}>
                <FormField
                  label="Name"
                  type="text"
                  name="adminName"
                  id="adminName"
                  placeholder="Please enter center admin name"
                  isMandetory="true"
                />
                <FormField
                  label="Mobile Number"
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Please enter phone number"
                  isMandetory="true"
                />
                <FormField
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Please enter new password"
                  isMandetory="true"
                />
              </article>
            </section>

            {/* Permanent Address */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Permanent Address</h2>
              <article className={styles.container}>
                <FormField
                  label="Address"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Please enter address"
                  isMandetory="true"
                />

                <FormField
                  label="Pin Code"
                  type="number"
                  name="pinCode"
                  id="pinCode"
                  placeholder="Please enter permanent pin code"
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

            {/* Communication Details */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Communication Details</h2>
              <article className={styles.container}>
                <FormField
                  label="Alternate Mobile Number"
                  type="number"
                  name="alternateNumber"
                  id="alternateNumber"
                  placeholder="Please enter alternate mobile number"
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

            {/* Button To Transition to Next part of the form  */}
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

export default addCenterAdmin;
