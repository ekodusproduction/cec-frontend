import React from "react";
import styles from "../Forms.module.css";
import Button from "../../Buttons/Button";

const FirmDetails = ({ prevStep }) => {
  return (
    <>
      <section action="" className={styles.sectionContainer}>
        <h3 className={styles.sectionHeading}>Firm Details</h3>
        <article className={styles.container}>
          <div className={styles.formControl}>
            <label htmlFor="Fname">Firm Name</label>
            <input id="Fname" type="text" placeholder="Firm Name" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="">Select Type</label>
            <input id="" type="text" placeholder="" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="">Type of institution</label>
            <input id="" type="text" placeholder="" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="POF">Postal Address of Firm</label>
            <input id="POF" type="text" placeholder="Postal Address of Firm" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="addressNow">Address</label>
            <input id="addressF" type="text" placeholder="Address" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="landmark">Landmark</label>
            <input id="landmark" type="text" placeholder="Landmark" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="POF">Post Office</label>
            <input id="POF" type="text" placeholder="Post Office" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="pincodeF">Pin Code</label>
            <input id="pincodeF" type="text" placeholder="Pincode" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="PSF">Police Station</label>
            <input id="PSF" type="text" placeholder="Police Station" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="DistrictF">District</label>
            <input id="DistrictF" type="text" placeholder="District" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="stateF">State</label>
            <input id="stateF" type="text" placeholder="State" />
          </div>
        </article>
      </section>
      <section action="" className={styles.sectionContainer}>
        <h3 className={styles.sectionHeading}>Communication details of Firm</h3>
        <article className={styles.container}>
          <div className={styles.formControl}>
            <label htmlFor="stdF">STD Code</label>
            <input id="stdF" type="text" placeholder="STD Code" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="contactF">Contact Number</label>
            <input id="contactF" type="text" placeholder="Contact Number" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="mobileF">Mobile Number</label>
            <input id="mobileF" type="text" placeholder="Mobile Number" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="altMobileF">Alternative Mobile Number</label>
            <input
              id="altMobileF"
              type="text"
              placeholder="Alternative Mobile Number"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="waNumber">Whatsapp Number</label>
            <input id="waNumber" type="text" placeholder="Whatsapp Number" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="emailF">Email</label>
            <input id="emailF" type="text" placeholder="Email Address" />
          </div>
        </article>
      </section>
      <div className={styles.btnContainer}>
        <Button type="button" onClick={prevStep}>
          Previous
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </>
  );
};

export default FirmDetails;
