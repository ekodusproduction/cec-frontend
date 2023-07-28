import styles from "./SelectCourse.module.css";
import { useState, useEffect } from "react";

import Button from "../components/Buttons/Button";

const SelectCourse = () => {
  const [qualification, setQualalification] = useState();
  const [courses, setCourses] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHanlder = (event) => {
    const value = event.target.value;
    if (value) {
      setQualalification(value);
    }
  };

  useEffect(() => {
    const fetchCouses = async () => {
      setIsLoading(true);
      const response = await axios.get("/courseData.json");
      const data = response.data;
      setIsLoading(false);
      const filteredData = data.filter(
        (item) => item.course_level <= qualification
      );
      setCourses(filteredData);
    };

    try {
      fetchCouses();
    } catch {
      console.log("opps! something went wrong");
    }
  }, [qualification]);

  return (
    <section className={styles.container}>
      <header className={styles.qualSection}>
        <h2 className={styles.heading}>
          Please enter the highest Qualification
        </h2>
        <select className={styles.dropDown} onChange={onChangeHanlder}>
          <option value="">Select Qualification</option>
          <option value="1">Metric</option>
          <option value="2">HSLC</option>
          <option value="3">HSC</option>
          <option value="4">Degree</option>
        </select>
      </header>
      {isLoading && <p>Loading Courses...</p>}
      {courses && !isLoading && (
        <article className={styles.coursesContainer}>
          {courses.map((item) => (
            <div key={item.course_name} className={styles.courseContainer}>
              <article className={styles.course}>
                <h3 className={styles.courseTitle}>{item.course_name}</h3>
                <p>Duration: {item.course_duration} months</p>
                <p>Qualification: {item.course_prerequsite} </p>
                <p>Total Course Fee: Rs {item.course_price}</p>
                <p>
                  Registration Fee: Rs{" "}
                  {`${Math.round(0.1 * item.course_price)}`}
                </p>
              </article>
              <Button>Enroll</Button>
            </div>
          ))}
        </article>
      )}
    </section>
  );
};

export default SelectCourse;
