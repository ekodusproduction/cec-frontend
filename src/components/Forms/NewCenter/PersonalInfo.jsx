import React from "react";
import styles from "../Forms.module.css";
import Button from "../../Buttons/Button";

const PersonalInfo = ({ nextStep }) => {
  return (
    <>
      <section action="" className={styles.sectionContainer}>
        <h3 className={styles.sectionHeading}>
          Please fill in the details to make a new center registration
        </h3>
        <article className={styles.container}>
          <div className={styles.formControl}>
            <label htmlFor="Fcode">Franchise Code</label>
            <input id="Fcode" type="text" placeholder="Franchise Code" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="hoi">Name of Head of institution</label>
            <input
              id="hoi"
              type="text"
              placeholder="Name of Head of institution"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="dor">Date of Registration</label>
            <input id="dor" type="text" placeholder="Date of Registration" />
          </div>
        </article>
      </section>
      <section action="" className={styles.sectionContainer}>
        <h3 className={styles.sectionHeading}>Permanent Address</h3>
        <article className={styles.container}>
          <div className={styles.formControl}>
            <label htmlFor="address">Address</label>
            <input id="address" type="text" placeholder="Address" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="PO">Post Office</label>
            <input id="PO" type="text" placeholder="Post Office" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="pincode">Pincode</label>
            <input id="pincode" type="text" placeholder="Pincode" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="policeS">Police Station</label>
            <input id="policeS" type="text" placeholder="Police Station" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="district">District</label>
            <input id="district" type="text" placeholder="District" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="state">State</label>
            <input id="state" type="text" placeholder="State" />
          </div>
        </article>
      </section>
      <div className={styles.btnContainer}>
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
    </>
  );
};

export default PersonalInfo;
