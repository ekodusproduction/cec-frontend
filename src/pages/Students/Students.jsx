import styles from "./Students.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { indianDate } from "../../utils";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const centerId = localStorage.getItem("centerId");
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const apiUrl = `/api/student/center/${centerId}`;
        const response = await axios.get(apiUrl, { headers });

        const data = response.data.data;
        const studentsData = data.map((item) => {
          const {
            firstName,
            lastName,
            rollNumber,
            createdAt,
            centerId,
            course,
          } = item;

          const { centerName } = centerId;
          const regDate = indianDate(createdAt);
          const fullName = `${firstName} ${lastName}`;
          const id = rollNumber;
          const courseName = course[0]?.courseName;

          return {
            fullName,
            rollNumber,
            regDate,
            centerName,
            courseName,
            id,
          };
        });

        setStudents(studentsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const actionBodyTemplate = ({ rollNumber }) => {
    return (
      <div className="action-column">
        <Link to={`/student/${rollNumber}`}>
          <BsEyeFill />
        </Link>
      </div>
    );
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.studentsPage}>
          <h2 className={styles.heading}>Students List</h2>
          <div className={styles.card}>
            <DataTable
              value={students}
              stripedRows
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
              <Column field="fullName" sortable filter header="Student Name" />
              <Column field="rollNumber" sortable filter header="Roll Number" />
              <Column
                field="regDate"
                sortable
                filter
                header="Registration Date"
              />
              <Column field="courseName" sortable filter header="Course" />
              <Column header="Actions" body={actionBodyTemplate} />
            </DataTable>
          </div>
        </section>
      )}
    </>
  );
};

export default Students;
