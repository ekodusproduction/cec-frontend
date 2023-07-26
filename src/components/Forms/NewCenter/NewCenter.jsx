import PersonalInfo from "./PersonalInfo";
import FirmDetails from "./FirmDetails";
import styles from "../Forms.module.css";
import { useState } from "react";

const NewCenter = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  return (
    <section className={styles.formContainer}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Registration Form</h2>
        <div>{currentStep}/2</div>
      </header>
      <form>
        {currentStep === 1 && <PersonalInfo nextStep={nextStep} />}
        {currentStep === 2 && <FirmDetails prevStep={prevStep} />}
      </form>
    </section>
  );
};

export default NewCenter;
