import FormField from "../FormField";
import Button from "../../Buttons/Button";
import styles from "../formStyles.module.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const validationSchema = Yup.object().shape({
  adminName: Yup.string().required("Name is a required Field"),
  mobile: Yup.number()
    .positive("Mobile number can't be Negative")
    .required("Mobile number is required")
    .test(
      "len",
      "Mobile number must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    ),
  address: Yup.string().required("address is required"),
  pinCode: Yup.number()
    .positive("Pin Code can't be Negative")
    .required("pin code is required")
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
    .positive("can't be Negative")
    .test(
      "len",
      "Alternate number must be exactly 10 digits",
      (val) => !val || (val && val.toString().length === 10)
    ),
});

const EditAdmin = () => {
  const { state: data } = useLocation();
  const centerId = data._id;
  const { headOfInstitute } = data;
  const centerAdminId = data?.headOfInstitute?._id;
  const initialValues = {
    adminName: headOfInstitute.adminName,
    mobile: headOfInstitute.mobile,
    address: headOfInstitute.address,
    pinCode: headOfInstitute.pinCode,
    district: headOfInstitute.district,
    state: headOfInstitute.state,
    email: headOfInstitute.email,
    alternateNumber: headOfInstitute.alternateNumber,
  };
  const [formData, setFormData] = useState(initialValues);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  const handleSubmit = async (values) => {
    try {
      await axios
        .put(`/api/centeradmin/${centerAdminId}`, values, { headers })
        .then(() => {
          setFormData(values);
          toast.success("Changes Done!");
        });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
            <h1 className={styles.heading}>Edit Center Admin Details</h1>
            <Form>
              {/* Enter Center Owner Details */}
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Basic Details</h2>
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
              </div>
            </Form>
          </section>
        </>
      )}
    </Formik>
  );
};

export default EditAdmin;
