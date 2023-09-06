import FormField from "../FormField";
import Button from "../../Buttons/Button";
import styles from "../formStyles.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { formatDate } from "../../../utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const validationSchema = Yup.object().shape({
  directorName: Yup.string()
    .required("Director Name is required")
    .min(4, "Director Name must be atleast 4 characters long"),
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
    .positive("Pin Code can't be Negative")
    .required("Pin code is required")
    .test(
      "len",
      "Pin code must be exactly 6 digits",
      (val) => val && val.toString().length === 6
    ),
  district: Yup.string().required("District is required"),
  state: Yup.string().required("State is required"),
  whatsApp: Yup.number()
    .positive("What's app can't be negative")
    .required("Whatsapp number is required")
    .test(
      "len",
      "Registration number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
  alternateNumber: Yup.number()
    .positive("Alternate Number can't be negative")
    .test(
      "len",
      "Alternate number must be exactly 10 digits",
      (val) => !val || (val && val.toString().length === 10)
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/\.com$/, "Email must end with '.com'"),
});

const EditCenter = () => {
  const { state: center } = useLocation();
  const centerId = center._id;
  const initialValues = {
    directorName: center.directorName || "",
    centerName: center.centerName || "",
    centerCode: center.centerCode || "",
    dateofReg: formatDate(center.dateofReg) || "",
    address: center.address || "",
    landmark: center.landmark || "",
    pinCode: center.pinCode || "",
    district: center.district || "",
    state: center.district || "",
    alternateNumber: center.alternateNumber || "",
    whatsApp: center.whatsApp || "",
    email: center.email || "",
  };
  const [formData, setFormData] = useState(initialValues);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  const handleSubmit = async (values) => {
    try {
      await axios
        .put(`/api/center/${centerId}`, values, { headers })
        .then(() => {
          toast.success("Changes sucessfull");
          setFormData(values);
        });
    } catch (error) {
      toast.error(error.reposne.data.message);
    }
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {() => (
        <>
          <Link to={`/centers/${centerId}`} className="backLink">
            <BsArrowLeft />
            Go Back
          </Link>
          <section className={styles.formContainer}>
            <h1 className={styles.heading}>Edit Center Details</h1>
            <Form>
              {/* Firm Details */}
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Center Details</h2>
                <article className={styles.container}>
                  <FormField
                    label="Director Name"
                    type="text"
                    name="directorName"
                    id="directorName"
                    placeholder="Please enter Director Name"
                    isMandetory="true"
                  />
                  <FormField
                    label="Center Name"
                    type="text"
                    name="centerName"
                    id="centerName"
                    placeholder="Please enter Center Name"
                    isMandetory="true"
                  />
                  <FormField
                    label="Center Code"
                    type="text"
                    name="centerCode"
                    id="centerCode"
                    placeholder="Please enter center code"
                    isMandetory="true"
                  />
                  <FormField
                    label="Date of Registration"
                    type="date"
                    name="dateofReg"
                    id="dateofReg"
                    placeholder="Please enter the date of Registration"
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
              </div>
            </Form>
          </section>
        </>
      )}
    </Formik>
  );
};

export default EditCenter;
