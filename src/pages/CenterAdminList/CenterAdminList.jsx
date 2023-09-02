import styles from "../Students/Students.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { indianDate } from "../../utils";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const CenterAdminList = () => {
  const [centerAdmin, setCenteAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("api/centeradmin/all", { headers });
        const updatedData = response.data.data.map((item) => {
          const date = item.createdAt;
          const regDate = indianDate(date);
          return { ...item, regDate };
        });
        setCenteAdmin(updatedData);
      } catch (error) {
        toast.error("Oops something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <section className={styles.studentsPage}>
          <h2 className={styles.heading}>Center Admin List</h2>
          <div className={styles.card}>
            <DataTable
              value={centerAdmin}
              stripedRows
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
              <Column field="adminName" sortable filter header="Admin Name" />
              <Column
                field="regDate"
                sortable
                filter
                header="Registration Date"
              />
              <Column field="mobile" sortable filter header="Mobile" />
              <Column field="pinCode" sortable filter header="Pin Code" />
              <Column field="email" sortable filter header="Email" />
            </DataTable>
          </div>
        </section>
      )}
    </>
  );
};

export default CenterAdminList;
