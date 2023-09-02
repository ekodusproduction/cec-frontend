import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Button from "../../components/Buttons/Button";
import { Link } from "react-router-dom";
import styles from "./Courses.module.css";
import Loader from "../../components/Loader/Loader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useAuth from "../../hooks/useAuth";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isSuper } = useAuth();
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const response = await axios.get("api/course", { headers });

      const { data } = response.data;
      const courseData = data.map((course) => {
        const {
          // category,
          courseCode,
          courseFee,
          courseName,
          duration,
          qualificationType,
        } = course;
        const { qualification, registrationFees } = qualificationType;
        // const courseCategory = category.category;
        const id = courseCode;

        return {
          id,
          // courseCategory,
          courseCode,
          courseName,
          courseFee: courseFee.toFixed(2),
          registrationFees: registrationFees.toFixed(2),
          qualification,
          duration,
        };
      });
      setCourses(courseData);
      setIsLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <section className={styles.coursePage}>
      <div className={styles.link}>
        <h2>Courses List</h2>
        {isSuper && (
          <Link to="/courses/newcourse">
            <Button>Add Course</Button>
          </Link>
        )}
      </div>

      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.card}>
          <DataTable
            value={courses}
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            className={styles.table}
          >
            <Column field="courseCode" sortable filter header="Course Code" />
            <Column field="courseName" sortable filter header="Course Name" />
            <Column field="courseFee" sortable filter header="Course Fee" />
            <Column
              field="registrationFees"
              sortable
              filter
              header="Registration Fee"
            />
            <Column
              field="qualification"
              sortable
              filter
              header="Qualification"
            />
            <Column
              field="duration"
              sortable
              filter
              header="Duration (Months)"
            />
            {/* <Column field="courseCategory" sortable filter header="Category" /> */}
          </DataTable>
        </div>
      )}
    </section>
  );
};

export default CoursesPage;
