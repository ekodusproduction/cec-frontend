import React, { useState } from "react";
import { Formik, Form } from "formik";
import Personal from "./Personal";
import Contact from "./Contact";
import Additional from "./Additional";

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (values) => {
    setFormData({ ...formData, ...values });
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      <h1>Multi-Step Form</h1>
      <Formik initialValues={formData} onSubmit={handleFormSubmit}>
        {({ values }) => (
          <Form>
            {step === 1 && <Personal />}
            {step === 2 && <Contact />}
            {step === 3 && <Additional />}
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((prevStep) => prevStep - 1)}
              >
                Previous
              </button>
            )}
            {step < 3 && <button type="submit">Next</button>}
            {step === 3 && <button type="submit">Submit</button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
