import { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import styles from "./NewStudent.module.css";
import Courses from "../../components/Courses/Courses";
import axios from "../../api/axios";
import Loader from "../../components/Loader/Loader";
import { cartActions } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const NewStudents = () => {
  const [qualifications, setQualifications] = useState("");
  const [selectedQualification, setSelectedQualification] = useState("");
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchQualifications = async () => {
      const response = await axios.get("/api/qualification", { headers });
      const { data } = response.data;
      setQualifications(data);
    };

    fetchQualifications();
  }, []);

  const handleQualificationChange = (event) => {
    const qualification = event.target.value;
    setSelectedQualification(qualification);
    console.log(qualification);
    dispatch(cartActions.setQualification(qualification));
  };

  return (
    <>
      <section className={styles.newStudentPage}>
        <h2>Register New Student</h2>
        {!qualifications && <Loader />}
        {qualifications && (
          <Container>
            <h2 className={styles.heading}>Select Student Qualification</h2>
            <select
              value={selectedQualification}
              onChange={handleQualificationChange}
              className={styles.inputContainer}
            >
              <option value="">Select Qualification</option>
              {qualifications.map((option) => (
                <option key={option["_id"]} value={option["_id"]}>
                  {option.qualification}
                </option>
              ))}
            </select>
          </Container>
        )}

        {selectedQualification && (
          <Courses qualification={selectedQualification} />
        )}
      </section>
    </>
  );
};

export default NewStudents;
