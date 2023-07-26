import styles from "../Forms.module.css";
import { formData } from "../../../constants";
import Button from "../../Buttons/Button";

const StudnetBasic = ({ formik, nextStep }) => {
  return (
    <>
      {formData.map((item, idx) => {
        const fieldName = item.id;
        return (
          <div key={idx} className={styles.formControl}>
            <label htmlFor={fieldName}>{item.label}</label>
            <input
              type={item.type}
              name={fieldName}
              id={fieldName}
              placeholder={item.placeholder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[fieldName]}
              className={`${
                formik.touched[fieldName] && formik.errors[fieldName]
                  ? styles.error
                  : ""
              }`}
            />
            {formik.touched[fieldName] && formik.errors[fieldName] && (
              <span className={styles.errorText}>
                {formik.errors[fieldName]}
              </span>
            )}
          </div>
        );
      })}
      <div className={styles.btnContainer}>
        <Button type="button" onClick={nextStep}>
          Next
        </Button>
      </div>
    </>
  );
};

export default StudnetBasic;
