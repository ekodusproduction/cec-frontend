// AdditionalInfo.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AdditionalInfoSchema = Yup.object().shape({
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});

const Additional = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AdditionalInfoSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="address">Address:</label>
          <Field type="text" id="address" name="address" />
          <ErrorMessage name="address" component="div" />
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <Field type="text" id="city" name="city" />
          <ErrorMessage name="city" component="div" />
        </div>
      </Form>
    </Formik>
  );
};

export default Additional;
