import React from "react";
import { useField } from "formik";
import styles from "./formStyles.module.css";

const FormField = ({ label, isMandetory, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <div className={styles.formControl}>
      <label htmlFor={props.id || props.name}>
        {label}
        <span className={styles.important}>{isMandetory && "*"}</span>
      </label>
      <input
        {...field}
        {...props}
        className={`${hasError ? styles.error : ""}`}
      />
      {hasError && <span className={styles.errorText}>{meta.error}</span>}
    </div>
  );
};

export default FormField;
