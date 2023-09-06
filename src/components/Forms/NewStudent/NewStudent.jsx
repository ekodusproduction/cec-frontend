import FormField from "../FormField";
import styles from "../formStyles.module.css";

const NewStudent = ({ isSuper }) => {
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>
          Please enter student basic details
        </h2>
        <article className={styles.containerStudent}>
          {isSuper && (
            <FormField
              label="Center Code"
              type="text"
              name="centerCode"
              id="centerCode"
              placeholder="Please enter center code"
              isMandetory="true"
            />
          )}
          <FormField
            label="First Name"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Please enter the First Name"
            isMandetory="true"
          />
          <FormField
            label="Last Name"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Please enter last Name"
            isMandetory="true"
          />
          <FormField
            label="Date of Birth"
            type="date"
            name="DOB"
            id="DOB"
            placeholder="Please enter the DOB"
            isMandetory="true"
          />
          <FormField
            label="Phone"
            type="number"
            name="mobile"
            id="mobile"
            placeholder="Please enter phone number"
            isMandetory="true"
          />
        </article>
      </section>

      {/* Present Address Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Present Address</h2>
        <article className={styles.containerStudent}>
          <FormField
            label="Address"
            type="text"
            name="presentAddress"
            id="presentAddress"
            placeholder="Please enter present address"
            isMandetory="true"
          />

          <FormField
            label="City"
            type="text"
            name="cityPresent"
            id="cityPresent"
            placeholder="Please enter present city"
            isMandetory="true"
          />
          <FormField
            label="Pin Code"
            type="number"
            name="pinCodePresent"
            id="pinCodePresent"
            placeholder="Please enter present Pin Code"
            isMandetory="true"
          />
          <FormField
            label="State"
            type="text"
            name="statePresent"
            id="statePresent"
            placeholder="Please enter present State"
            isMandetory="true"
          />
        </article>
      </section>
    </>
  );
};

export default NewStudent;
