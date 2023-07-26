import styles from "../Forms.module.css";
import { getStudentSchema } from "../../../constants";
import { useFormik } from "formik";
import StudnetBasic from "./StudentBasic";
import { useState } from "react";
import Academic from "./Academic";

const NewStudent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  const formik = useFormik({
    initialValues: {
      Fname: "",
      Lname: "",
      gender: "",
      bloodgrp: "",
      caste: "",
      fName: "",
      mName: "",
      bpl: "",
      addressPrm: "",
      housePrm: "",
      statePrm: "",
      countryPrm: "",
      pincodePrm: "",
      sdt: "",
      phoneS: "",
      email: "",
      addressPst: "",
      housePst: "",
      statePst: "",
      countryPst: "",
      pincodePst: "",
      phoneP: "",
    },
    onSubmit: (values) => {
      console.log("checking!!", values);
    },

    validationSchema: getStudentSchema(),
  });

  return (
    <section className={styles.formContainer}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Add Student Basic Details</h2>
        <div>{currentStep}/2</div>
      </header>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
        {currentStep === 1 && (
          <StudnetBasic formik={formik} nextStep={nextStep} />
        )}
        {currentStep === 2 && <Academic formik={formik} prevStep={prevStep} />}
      </form>
    </section>
  );
};

export default NewStudent;
