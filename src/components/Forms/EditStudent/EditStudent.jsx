import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../Buttons/Button";
import FormField from "../FormField";
import styles from "../formStyles.module.css";
import { useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/index";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const validationSchema = Yup.object().shape({
  fathersName: Yup.string()
    .required("Please enter father's name")
    .max(50, "Father's name must be at most 50 characters long"),
  mothersName: Yup.string()
    .required("Please enter mother's name")
    .max(50, "Mother's name must be at most 50 characters long"),
  gender: Yup.string().required("Please select gender"),
  bloodGroup: Yup.string().required("Please enter blood group"),
  caste: Yup.string().required("Please select caste"),
  BPL: Yup.string().required("Please select BPL information"),
  emergencyContact: Yup.number()
    .positive("Emergency contact must be a positive number")
    .integer("Emergency contact must be an integer")
    .test(
      "len",
      "Emergency contact must be exactly 10 digits",
      (val) => val && val.toString().length === 10
    )
    .required("Please enter emergency phone number"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address"
    ),
  year: Yup.number()
    .integer("Please enter a valid year")
    .required("Please enter passing year")
    .min(1950, "Year can't be before 1950")
    .max(new Date().getFullYear(), "Year can't be in the future"),
  institute: Yup.string().required("Please enter university/board name"),
  grade: Yup.string().required("Please select grade"),
  percentage: Yup.number()
    .required("Please enter marks in %")
    .min(0, "Percentage can't be negative")
    .max(100, "Percentage can't be greater than 100")
    .moreThan(30, "Percentage should be greater than 30"),
  addressProof: Yup.mixed().required("Please upload address proof"),
  idProof: Yup.mixed().required("Please upload ID proof"),
  academicCertificates: Yup.mixed().required(
    "Please upload academic qualification"
  ),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  DOB: Yup.date().required("Date of Birth is required"),
  mobile: Yup.number()
    .required("Mobile Number is required")
    .test("isTenDigits", "Mobile number must be exactly 10 digits", (value) =>
      /^\d{10}$/.test(value)
    ),
  pinCodePresent: Yup.number()
    .required("Present Pin Code is required")
    .test("isSixDigits", "Pin code must be exactly 6 digits", (value) =>
      /^\d{6}$/.test(value)
    ),
  presentAddress: Yup.string().required("Present Address is required"),
  cityPresent: Yup.string().required("Present City is required"),
  statePresent: Yup.string().required("Present State is required"),
  // permanentAddress: Yup.string().required("Permanent Address is required"),
  // statePermanent: Yup.string().required("Permanent State is required"),
  // cityPermanent: Yup.string().required("Permanent City is required"),
  // pinCodePermanent: Yup.number()
  //   .required("Permanent Pin Code is required")
  //   .test("isSixDigits", "Pin code must be exactly 6 digits", (value) =>
  //     /^\d{6}$/.test(value)
  //   ),
  qualification: Yup.string().required("Please select qualification"),
});

const initialValues = {
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
  fathersName: "",
  mothersName: "",
  gender: "",
  bloodGroup: "",
  caste: "",
  BPL: "",
  emergencyContact: "",
  email: "",
  qualification: "",
  year: "",
  institute: "",
  grade: "",
  percentage: "",
  addressProof: null,
  idProof: null,
  academicCertificates: null,
};

const EditStudent = () => {
  const { state: data } = useLocation();
  const studentRollNumber = data.rollNumber;
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };
  const [qualifications, setQualifications] = useState("");
  const [loading, setLoading] = useState(false);
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);
  const [academicCertificatesFile, setAcademicCertificatesFile] =
    useState(null);

  const { DOB } = data;
  const student = { ...data, DOB: formatDate(DOB) };
  const qualification = data?.qualification?._id;
  delete student.rollNumber;
  const updatedData = { ...initialValues, ...student, qualification };

  useEffect(() => {
    const fetchQualifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/qualification", { headers });
        const { data } = response.data;
        setQualifications(data);
      } catch (error) {
        toast.error("Failed to Load Data");
      } finally {
        setLoading(false);
      }
    };

    fetchQualifications();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await axios
        .put(`api/student/update/${studentRollNumber}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Changes Successful");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveFile = (fieldName, setFieldValue) => {
    switch (fieldName) {
      case "addressProof":
        setAddressProofFile(null);
        setFieldValue("addressProof", null);
        document.getElementById("addressProof").value = null;
        break;
      case "idProof":
        setIdProofFile(null);
        setFieldValue("idProof", null);
        document.getElementById("idProof").value = null;
        break;
      case "academicCeritificates":
        setAcademicCertificatesFile(null);
        setFieldValue("academicCertificates", null);
        document.getElementById("academicCertificates").value = null;
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Link to={`/student/${studentRollNumber}`} className="backLink">
        <BsArrowLeft />
        Go Back
      </Link>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.formContainer}>
          <h1 className={styles.heading}>Edit Students Details </h1>
          <Formik
            initialValues={updatedData}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form>
                {/* Students Basic */}
                <section className={styles.section}>
                  <h2 className={styles.sectionHeading}>
                    Please enter basic student details
                  </h2>
                  <article className={styles.container}>
                    <FormField
                      label="First Name"
                      type="text"
                      name="firstName"
                      isMandetory="true"
                      placeholder="Enter student first name"
                    />
                    <FormField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      isMandetory="true"
                      placeholder="Enter student last name"
                    />
                    <FormField
                      label="Date of Birth"
                      type="date"
                      name="DOB"
                      isMandetory="true"
                      placeholder="Enter students DOB"
                    />
                    <FormField
                      label="Mobile Number"
                      type="number"
                      name="mobile"
                      isMandetory="true"
                      placeholder="Enter student mobile number"
                    />
                  </article>
                </section>

                {/* Student Other Details */}
                <section className={styles.section}>
                  <h2 className={styles.sectionHeading}>
                    Student Other Details
                  </h2>
                  <article className={styles.container}>
                    <FormField
                      label="Father's Name"
                      type="text"
                      name="fathersName"
                      placeholder="Please enter father's name"
                    />
                    <FormField
                      label="Mother's Name"
                      type="text"
                      name="mothersName"
                      placeholder="Please enter mother's name"
                    />
                    <FormField
                      label="Gender"
                      type="text"
                      name="gender"
                      placeholder="Please enter gender"
                    />
                    <FormField
                      label="Blood Group"
                      type="text"
                      name="bloodGroup"
                      placeholder="please enter the blood group"
                    />
                    <FormField
                      label="Caste"
                      type="text"
                      name="caste"
                      placeholder="Enter student caste"
                    />
                    <FormField
                      label="BPL Status"
                      type="text"
                      name="BPL"
                      placeholder="Student has Bpl Card (Yes / No)"
                    />
                    <FormField
                      label="Emergency Phone Number"
                      type="number"
                      name="emergencyContact"
                      placeholder="Enter emergency phone number"
                    />
                    <FormField
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter student email ID"
                    />
                  </article>
                </section>

                {/* present Address */}
                <section className={styles.section}>
                  <h2 className={styles.sectionHeading}>Present Address</h2>
                  <article className={styles.container}>
                    <FormField
                      label="Present Address"
                      type="text"
                      name="presentAddress"
                      isMandetory="true"
                      placeholder="Enter present address"
                    />
                    <FormField
                      label="Present City"
                      type="text"
                      name="cityPresent"
                      isMandetory="true"
                      placeholder="Enter present city"
                    />
                    <FormField
                      label="Present State"
                      type="text"
                      name="statePresent"
                      isMandetory="true"
                      placeholder="Enter present state"
                    />
                    <FormField
                      label="Present Pin Code"
                      type="number"
                      name="pinCodePresent"
                      isMandetory="true"
                      placeholder="enter present pincode"
                    />
                  </article>
                </section>

                {/* Permanent Address
                <section className={styles.section}>
                  <h2 className={styles.sectionHeading}>Permanent Address</h2>
                  <article className={styles.container}>
                    <FormField
                      label="Permanent Address"
                      type="text"
                      name="permanentAddress"
                      isMandetory="true"
                      placeholder="Enter permanent address"
                    />
                    <FormField
                      label="Permanent State"
                      type="text"
                      name="statePermanent"
                      isMandetory="true"
                      placeholder="Enter the permanent state"
                    />
                    <FormField
                      label="Permanent City"
                      type="text"
                      name="cityPermanent"
                      isMandetory="true"
                      placeholder="Enter student permanent city"
                    />
                    <FormField
                      label="Permanent Pin Code"
                      type="number"
                      name="pinCodePermanent"
                      isMandetory="true"
                      placeholder="Enter permanent pincode"
                    />
                  </article>
                </section> */}

                {/* Qualification Details */}
                <section className={styles.section}>
                  <h2 className={styles.sectionHeading}>
                    Qualification Details
                  </h2>
                  <article className={styles.container}>
                    {qualifications && (
                      <div className={styles.formControl}>
                        <label htmlFor="gender">Qualification</label>
                        <select
                          name="qualification"
                          id="qualification"
                          value={values.qualification}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${
                            errors.qualification && touched.qualification
                              ? styles.error
                              : ""
                          }`}
                        >
                          {qualifications.map((option) => (
                            <option key={option["_id"]} value={option["_id"]}>
                              {option.qualification}
                            </option>
                          ))}
                        </select>

                        {errors.qualification && touched.qualification && (
                          <span className={styles.errorText}>
                            {errors.qualification}
                          </span>
                        )}
                      </div>
                    )}

                    <FormField
                      label="Year"
                      type="number"
                      name="year"
                      placeholder="Please enter Year Of Passing"
                    />
                    <FormField
                      label="Institute"
                      type="text"
                      name="institute"
                      placeholder="College or University Name"
                    />
                    <FormField
                      label="Grade"
                      type="text"
                      name="grade"
                      placeholder="Passing Grade"
                    />
                    <FormField
                      label="Percentage"
                      type="number"
                      name="percentage"
                      placeholder="Marks Obtained in %"
                    />
                  </article>
                </section>

                {/* Address Proof */}
                <section className={styles.sectionAlt}>
                  <h2 className={styles.sectionHeading}>Address Proof</h2>
                  <article className={styles.containerAlt}>
                    {/* File Input */}
                    <input
                      type="file"
                      name="addressProof"
                      id="addressProof"
                      accept="image/jpeg, image/jpg, image/png, application/pdf"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.size <= 5242880) {
                          // 5MB file size limit
                          setAddressProofFile(file);
                          setFieldValue("addressProof", file);
                        } else {
                          toast.error(
                            "File size is too large. Maximum allowed size is 5MB."
                          );
                          // Clear the input value
                          event.target.value = null;
                        }
                      }}
                    />
                    {/* Image Preview */}
                    {addressProofFile && (
                      <div className={styles.filePreviewContainer}>
                        <img
                          src={URL.createObjectURL(addressProofFile)}
                          alt="Address Proof"
                          className={styles.filePreview}
                        />
                        <Button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            handleRemoveFile("addressProof", setFieldValue)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    {errors.addressProof && touched.addressProof && (
                      <span className={styles.errorText}>
                        {errors.addressProof}
                      </span>
                    )}
                  </article>
                </section>

                {/* Id Proof */}
                <section className={styles.sectionAlt}>
                  <h2 className={styles.sectionHeading}>ID Proof</h2>
                  <article className={styles.containerAlt}>
                    {/* File Input */}
                    <input
                      type="file"
                      name="idProof"
                      id="idProof"
                      accept="image/jpeg, image/jpg,  image/png, application/pdf"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.size <= 5242880) {
                          // 5MB file size limit
                          setIdProofFile(file);
                          setFieldValue("idProof", file);
                        } else {
                          toast.error(
                            "File size is too large. Maximum allowed size is 5MB."
                          );
                          event.target.value = null;
                        }
                      }}
                    />
                    {/* Image Preview */}
                    {idProofFile && (
                      <div className={styles.filePreviewContainer}>
                        <img
                          src={URL.createObjectURL(idProofFile)}
                          alt="ID Proof"
                          className={styles.filePreview}
                        />
                        <Button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            handleRemoveFile("idProof", setFieldValue)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    {errors.idProof && touched.idProof && (
                      <span className={styles.errorText}>{errors.idProof}</span>
                    )}
                  </article>
                </section>

                {/* academic certificates */}
                <section className={styles.sectionAlt}>
                  <h2 className={styles.sectionHeading}>
                    Academic Certificate
                  </h2>
                  <article className={styles.containerAlt}>
                    {/* File Input */}
                    <input
                      type="file"
                      name="academicCertificates"
                      id="academicCertificates"
                      accept="image/jpeg, image/jpg, image/png, application/pdf"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.size <= 5242880) {
                          // 5MB file size limit
                          setAcademicCertificatesFile(file);
                          setFieldValue("academicCertificates", file);
                        } else {
                          toast.error(
                            "File size is too large. Maximum allowed size is 5MB."
                          );
                          event.target.value = null;
                        }
                      }}
                    />
                    {/* Image Preview */}
                    {academicCertificatesFile && (
                      <div className={styles.filePreviewContainer}>
                        <img
                          src={URL.createObjectURL(academicCertificatesFile)}
                          alt="Academic Certificate"
                          className={styles.filePreview}
                        />
                        <Button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            handleRemoveFile(
                              "academicCeritificates",
                              setFieldValue
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                    {errors.academicCertificates &&
                      touched.academicCertificates && (
                        <span className={styles.errorText}>
                          {errors.academicCertificates}
                        </span>
                      )}
                  </article>
                </section>

                <div className={styles.btnContainer}>
                  <Button type="submit">Submit</Button>
                  <Link to={`/student/${studentRollNumber}`}>
                    <Button>Cancel</Button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      )}
    </>
  );
};

export default EditStudent;
