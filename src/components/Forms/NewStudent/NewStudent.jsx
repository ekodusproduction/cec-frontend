// import styles from "../Forms.module.css";
// import { getStudentSchema } from "../../../constants";
// import { useFormik } from "formik";
// import { formData } from "../../../constants";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const NewStudent = () => {
//   const formik = useFormik({
//     initialValues: {
//       Fname: "",
//       Lname: "",
//       dob: "",
//       phone: "",
//       addressPresent: "",
//       housePresent: "",
//       statePresent: "",
//       pincodePresent: "",
//       cityPresent: "",
//       addressPermanent: "",
//       housePermanent: "",
//       statePermanent: "",
//       pincodePermanent: "",
//       cityPremanent: "",
//       phoneE: "",
//       qualification: "",
//       courses: "",
//     },
//     onSubmit: (values) => {
//       console.log("checking!!", values);
//     },

//     validationSchema: getStudentSchema(),
//   });

//   const [qualification, setQualification] = useState();
//   const [courses, setCourses] = useState();

//   const onChangeHandler = (event) => {
//     setQualification(event.target.value);
//   };

//   useEffect(() => {
//     const fetchCouses = async () => {
//       const response = await axios.get("/courseData.json");
//       const data = response.data;
//       const filteredData = data.filter(
//         (item) => item.qualification === qualification
//       );
//       setCourses(filteredData);
//     };

//     try {
//       fetchCouses();
//     } catch {
//       console.log("Oops! something went wrong!");
//     }
//   }, [qualification]);

//   return (
//     <section className={styles.formContainer}>
//       <header className={styles.header}>
//         <h2 className={styles.heading}>Add Student Details</h2>
//       </header>
//       <form onSubmit={formik.handleSubmit} className={styles.container}>
//         <div className={styles.formControl}>
//           <label htmlFor="qualification">
//             select the highest qualification
//           </label>
//           <select
//             id="qualification"
//             name="qualification"
//             onChange={onChangeHandler}
//             onBlur={formik.handleBlur}
//             value={qualification}
//           >
//             <option value="">Select Qualification</option>
//             <option value="Metric">Metric</option>
//             <option value="HSLC">HSLC</option>
//             <option value="HSC">HSC</option>
//             <option value="Degree">Degree</option>
//           </select>
//         </div>
//         <div className={styles.formControl}>
//           <label htmlFor="courses">Select the Course</label>
//           <select
//             id="courses"
//             onChange={onChangeHandler}
//             value={formik.values.courses}
//             name="courses"
//             onBlur={formik.handleBlur}
//           >
//             <option value="">Select Course</option>
//             {courses &&
//               courses.map((item) => (
//                 <option key={Math.random()} value={item.qualification}>
//                   {item.course_name}
//                 </option>
//               ))}
//           </select>
//         </div>
//         <div key={idx} className={styles.formControl}>
//           <label htmlFor=""></label>
//           <input
//             type={item.type}
//             name={fieldName}
//             id={fieldName}
//             placeholder={item.placeholder}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values[fieldName]}
//             className={`${
//               formik.touched[fieldName] && formik.errors[fieldName]
//                 ? styles.error
//                 : ""
//             }`}
//           />
//           {formik.touched[fieldName] && formik.errors[fieldName] && (
//             <span className={styles.errorText}>{formik.errors[fieldName]}</span>
//           )}
//         </div>
//         <button type="">Submit</button>
//       </form>
//     </section>
//   );
// };

// export default NewStudent;

// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
// import * as Yup from "yup";
// import Select from "react-select";

// const options = [
//   { value: "bachelor", label: "Bachelor" },
//   { value: "master", label: "Master" },
//   { value: "phd", label: "PhD" },
//   // Add more qualification options as needed
// ];

// const coursesByQualification = {
//   bachelor: [
//     { value: "cs", label: "Computer Science" },
//     { value: "ee", label: "Electrical Engineering" },
//     { value: "me", label: "Mechanical Engineering" },
//   ],
//   master: [
//     { value: "ds", label: "Data Science" },
//     { value: "ai", label: "Artificial Intelligence" },
//     { value: "se", label: "Software Engineering" },
//   ],
//   phd: [
//     { value: "am", label: "Advanced Mathematics" },
//     { value: "tp", label: "Theoretical Physics" },
//     { value: "qm", label: "Quantum Mechanics" },
//   ],
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   age: Yup.number()
//     .typeError("Age must be a number")
//     .required("Age is required")
//     .positive("Age must be positive")
//     .integer("Age must be an integer"),
//   number: Yup.string().required("Number is required"),
//   qualification: Yup.object().shape({
//     value: Yup.string().required("Qualification is required"),
//     label: Yup.string().required("Qualification is required"),
//   }),
//   course: Yup.object().shape({
//     value: Yup.string().required("Course is required"),
//     label: Yup.string().required("Course is required"),
//   }),
// });

// const NewStudent = () => {
//   const [courseOptions, setCourseOptions] = useState([]);

//   useEffect(() => {
//     if (options.length > 0) {
//       setCourseOptions(coursesByQualification[options[0].value]);
//     }
//   }, []);

//   const handleQualificationChange = (selectedOption, formikContext) => {
//     formikContext.setFieldValue("qualification", selectedOption);
//     const selectedValue = selectedOption ? selectedOption.value : null;
//     setCourseOptions(coursesByQualification[selectedValue] || []);
//   };

//   const handleSubmit = (values) => {
//     // Handle form submission here with values
//     console.log(values);
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: "",
//         age: "",
//         number: "",
//         qualification: null,
//         course: null,
//       }}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ values, errors, touched, isSubmitting }) => (
//         <Form>
//           <div>
//             <label>
//               Name:
//               <Field type="text" name="name" />
//               <ErrorMessage
//                 name="name"
//                 component="div"
//                 className="error-message"
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Age:
//               <Field type="number" name="age" />
//               <ErrorMessage
//                 name="age"
//                 component="div"
//                 className="error-message"
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Number:
//               <Field type="text" name="number" />
//               <ErrorMessage
//                 name="number"
//                 component="div"
//                 className="error-message"
//               />
//             </label>
//           </div>
//           <div>
//             <label>Qualification:</label>
//             <Field
//               name="qualification"
//               component={CustomSelect}
//               options={options}
//               onChange={handleQualificationChange}
//             />
//             <ErrorMessage
//               name="qualification"
//               component="div"
//               className="error-message"
//             />
//           </div>
//           <div>
//             <label>Course:</label>
//             <Field
//               name="course"
//               component={CustomSelect}
//               options={courseOptions}
//             />
//             <ErrorMessage
//               name="course"
//               component="div"
//               className="error-message"
//             />
//           </div>
//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// const CustomSelect = ({ field, form, ...props }) => {
//   const handleChange = (selectedOption) => {
//     form.setFieldValue(field.name, selectedOption);
//     if (props.onChange) {
//       props.onChange(selectedOption, form);
//     }
//   };

//   const handleBlur = () => {
//     form.setFieldTouched(field.name, true);
//   };

//   return (
//     <Select
//       {...field}
//       {...props}
//       onChange={handleChange}
//       onBlur={handleBlur}
//       value={
//         props.options
//           ? props.options.find((option) => option.value === field.value?.value)
//           : ""
//       }
//     />
//   );
// };

// export default NewStudent;

import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const options = [
  { value: "bachelor", label: "Bachelor" },
  { value: "master", label: "Master" },
  { value: "phd", label: "PhD" },
  // Add more qualification options as needed
];

const coursesByQualification = {
  bachelor: [
    { value: "cs", label: "Computer Science" },
    { value: "ee", label: "Electrical Engineering" },
    { value: "me", label: "Mechanical Engineering" },
  ],
  master: [
    { value: "ds", label: "Data Science" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "se", label: "Software Engineering" },
  ],
  phd: [
    { value: "am", label: "Advanced Mathematics" },
    { value: "tp", label: "Theoretical Physics" },
    { value: "qm", label: "Quantum Mechanics" },
  ],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  number: Yup.string().required("Number is required"),
  qualification: Yup.object().shape({
    value: Yup.string().required("Qualification is required"),
    label: Yup.string().required("Qualification is required"),
  }),
  course: Yup.object().shape({
    value: Yup.string().required("Course is required"),
    label: Yup.string().required("Course is required"),
  }),
});

const formData = [
  {
    label: "First Name",
    placeholder: "Please enter the First Name",
    type: "text",
    name: "Fname",
    id: "Fname",
  },
  {
    label: "Last Name",
    placeholder: "Please enter last Name",
    type: "text",
    name: "Lname",
    id: "Lname",
  },
  {
    label: "Date of Birth",
    placeholder: "Please enter the DOB",
    type: "date",
    name: "dob",
    id: "dob",
  },
  {
    label: "Phone",
    placeholder: "Please enter the phone Number",
    type: "number",
    name: "phoneS",
    id: "phoneS",
  },
  {
    label: "Address (Present)",
    placeholder: "Please enter present address",
    type: "text",
    name: "addressPresent",
    id: "addressPresent",
  },
  {
    label: "House No (Present)",
    placeholder: "House No / Flat No",
    type: "text",
    name: "housePresent",
    id: "housePresent",
  },
  {
    label: "State (Present)",
    placeholder: "Please enter your present state",
    type: "text",
    name: "statePresent",
    id: "statePresent",
  },
  {
    label: "Pin Code (Present)",
    placeholder: "Please enter present Pin Code",
    type: "text",
    name: "pincodePresent",
    id: "pincodePresent",
  },
  {
    label: "Address (Permanent)",
    placeholder: "Please enter permanent address",
    type: "text",
    name: "addressPermanent",
    id: "addressPermanent",
  },
  {
    label: "House No (Permanent)",
    placeholder: "House No / Flat No",
    type: "text",
    name: "housePermanent",
    id: "housePermanent",
  },
  {
    label: "State (Permanent)",
    placeholder: "Please enter your permanent state",
    type: "text",
    name: "statePermanent",
    id: "statePermanent",
  },
  {
    label: "Pin Code (Permanent)",
    placeholder: "Please enter permanent Pin Code",
    type: "text",
    name: "pincodePermanent",
    id: "pincodePermanent",
  },
  {
    label: "Qualification",
    placeholder: "Please select your qualification",
    type: "select",
    name: "qualification",
    id: "qualification",
    options: options,
  },
  {
    label: "Course",
    placeholder: "Please select your course",
    type: "select",
    name: "course",
    id: "course",
    options: [],
  },
];

const NewStudent = () => {
  const [courseOptions, setCourseOptions] = React.useState([]);

  React.useEffect(() => {
    if (options.length > 0) {
      setCourseOptions(coursesByQualification[options[0].value]);
    }
  }, []);

  const handleQualificationChange = (selectedOption, formikContext) => {
    formikContext.setFieldValue("qualification", selectedOption);
    const selectedValue = selectedOption ? selectedOption.value : null;
    setCourseOptions(coursesByQualification[selectedValue] || []);
  };

  const handleSubmit = (values) => {
    // Handle form submission here with values
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        number: "",
        qualification: null,
        course: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form>
          {formData.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id}>{field.label}:</label>
              {field.type === "select" ? (
                <Field
                  name={field.name}
                  component={CustomSelect}
                  options={field.options || []}
                  onChange={
                    field.name === "qualification"
                      ? handleQualificationChange
                      : null
                  }
                />
              ) : (
                <Field
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                />
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="error-message"
              />
            </div>
          ))}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

const CustomSelect = ({ field, form, options, ...props }) => {
  const handleChange = (selectedOption) => {
    form.setFieldValue(field.name, selectedOption);
    if (props.onChange) {
      props.onChange(selectedOption, form);
    }
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };

  return (
    <Select
      {...field}
      {...props}
      options={options}
      onChange={handleChange}
      onBlur={handleBlur}
      value={
        options
          ? options.find((option) => option.value === field.value?.value)
          : ""
      }
    />
  );
};

export default NewStudent;
