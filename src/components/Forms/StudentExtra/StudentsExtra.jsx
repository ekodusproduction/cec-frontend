import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../FormField";
import styles from "../formStyles.module.css";
import { Link, useParams } from "react-router-dom";
import Button from "../../Buttons/Button";
import axios from "../../../api/axios";
import { toast } from "react-toastify";

const genderOptions = ["MALE", "FEMALE", "OTHERS"];
const bplOptions = ["YES", "NO"];
const casteOptions = ["GENERAL", "SC", "ST", "OBC"];
const gradeOptions = ["A", "B", "C", "D"];
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
    .max(100, "Percentage can't be greater than 100"),
  addressProof: Yup.mixed().required("Please upload address proof"),
  idProof: Yup.mixed().required("Please upload ID proof"),
  academicCertificates: Yup.mixed().required(
    "Please upload academic qualification"
  ),
});

const StudentExtra = ({ rollNumber }) => {
  const token = window.localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };
  const { roll } = useParams();

  const [addressProofFile, setAddressProofFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);
  const [academicCertificatesFile, setAcademicCertificatesFile] =
    useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const formData = new FormData();
      for (const key in values) {
        if (values[key] && typeof values[key] === "object") {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }

      axios
        .put(`api/student/update/${roll}`, formData, { headers })
        .then(() => {
          toast.success("Form submitted successfully");
          resetForm();
          document.getElementById("addressProof").value = null;
          document.getElementById("idProof").value = null;
          document.getElementById("academicCertificates").value = null;
          setAcademicCertificatesFile(null);
          setIdProofFile(null);
          setAddressProofFile(null);
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
      <Link to={`/student/${roll}`} className="backLink">
        <BsArrowLeft />
        Go Back
      </Link>
      <section className={styles.formContainer}>
        <h1 className={styles.heading}>Students Extra Details</h1>
        <Formik
          initialValues={{
            fathersName: "",
            mothersName: "",
            gender: "",
            bloodGroup: "",
            caste: "",
            BPL: "",
            emergencyContact: "",
            email: "",
            year: "",
            institute: "",
            grade: "",
            percentage: "",
            addressProof: null,
            idProof: null,
            academicCertificates: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>
                  Please enter basic student details
                </h2>
                <article className={styles.container}>
                  {/* Father's Name */}
                  <FormField
                    label="Father's Name"
                    placeholder="Please enter father's name"
                    type="text"
                    name="fathersName"
                    id="fatherName"
                  />

                  {/* Mother's Name */}
                  <FormField
                    label="Mother's Name"
                    placeholder="Please enter mother's name"
                    type="text"
                    name="mothersName"
                    id="motherName"
                  />

                  {/* Gender */}
                  <div className={styles.formControl}>
                    <label htmlFor="gender">Gender</label>
                    <select
                      name="gender"
                      id="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        errors.gender && touched.gender ? styles.error : ""
                      }`}
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.gender && touched.gender && (
                      <span className={styles.errorText}>{errors.gender}</span>
                    )}
                  </div>

                  {/* Blood Group */}
                  <FormField
                    label="Blood Group"
                    placeholder="Please enter blood group"
                    type="text"
                    name="bloodGroup"
                    id="bloodGroup"
                  />

                  {/* Caste */}
                  <div className={styles.formControl}>
                    <label htmlFor="caste">Caste</label>
                    <select
                      name="caste"
                      id="caste"
                      value={values.caste}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        errors.caste && touched.caste ? styles.error : ""
                      }`}
                    >
                      <option value="">Select caste</option>
                      {casteOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.caste && touched.caste && (
                      <span className={styles.errorText}>{errors.caste}</span>
                    )}
                  </div>

                  {/* BPL */}
                  <div className={styles.formControl}>
                    <label htmlFor="BPL">BPL</label>
                    <select
                      name="BPL"
                      id="BPL"
                      value={values.BPL}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        errors.BPL && touched.BPL ? styles.error : ""
                      }`}
                    >
                      <option value="">Select BPL status</option>
                      {bplOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.BPL && touched.BPL && (
                      <span className={styles.errorText}>{errors.BPL}</span>
                    )}
                  </div>
                </article>
              </section>
              {/* Contact Details */}
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Contact Details</h2>
                <article className={styles.container}>
                  {/* Emergency Phone */}
                  <FormField
                    label="Emergency Phone"
                    placeholder="Please enter the phone Number"
                    type="number"
                    name="emergencyContact"
                    id="emergencyContact"
                  />

                  {/* Email */}
                  <FormField
                    label="Email"
                    placeholder="Please enter the email address"
                    type="email"
                    name="email"
                    id="email"
                  />
                </article>
              </section>

              {/* Academic Qualifications */}
              <section className={styles.section}>
                <h2 className={styles.sectionHeading}>
                  Academic Qualification
                </h2>
                <article className={styles.container}>
                  {/* Passing Year */}
                  <FormField
                    label="Passing Year"
                    placeholder="Please enter the passing year"
                    type="number"
                    name="year"
                    id="year"
                  />

                  {/* University / Board */}
                  <FormField
                    label="University / Board"
                    placeholder="Enter the institute name"
                    type="text"
                    name="institute"
                    id="institute"
                  />

                  {/* Grade */}
                  <div className={styles.formControl}>
                    <label htmlFor="grade">Grade</label>
                    <select
                      name="grade"
                      id="grade"
                      value={values.grade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        errors.grade && touched.grade ? styles.error : ""
                      }`}
                    >
                      <option value="">Select grade</option>
                      {gradeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.grade && touched.grade && (
                      <span className={styles.errorText}>{errors.grade}</span>
                    )}
                  </div>

                  {/* Percentage */}
                  <FormField
                    label="Percentage %"
                    placeholder="Please enter marks in %"
                    type="number"
                    name="percentage"
                    id="percentage"
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
                <h2 className={styles.sectionHeading}>Academic Certificate</h2>
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

              {/* Button Container */}
              <div className={styles.btnContainer}>
                <Button type="submit">Submit</Button>
                <Button type="reset">Clear</Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default StudentExtra;
