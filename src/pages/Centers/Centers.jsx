import styles from "./Centers.module.css";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { indianDate } from "../../utils/index";
import Loader from "../../components/Loader/Loader";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CenterAdmins = () => {
  const [centers, setCenters] = useState();
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchCenterAdmins = async () => {
      setLoading(true);
      const response = await axios.get("api/center/all", { headers });

      console.log(response.data.data);

      const centersData = response.data.data.map((item) => {
        const {
          centerCode,
          centerName,
          dateofReg,
          totalStudent,
          directorName,
          _id,
        } = item;

        const registerDate = indianDate(dateofReg);

        return {
          centerCode,
          centerName,
          registerDate,
          totalStudent,
          directorName,
          centerId: _id,
        };
      });

      console.log(centersData);

      setCenters(centersData);
      setLoading(false);
    };
    fetchCenterAdmins();
  }, []);

  const actionBodyTemplate = ({ centerId }) => {
    return (
      <div className="action-column">
        <Link to={`/centers/${centerId}`}>
          <BsEyeFill />
        </Link>
      </div>
    );
  };

  return (
    <section>
      <h2 className={styles.heading}>Centers List</h2>
      {loading && <Loader />}
      {!loading && (
        <div className={styles.card}>
          <DataTable
            value={centers}
            stripedRows
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            <Column field="centerCode" sortable filter header="Center Code" />
            <Column field="centerName" sortable filter header="Center Name" />
            <Column
              field="registerDate"
              sortable
              filter
              header="Registration Date"
            />
            <Column
              field="totalStudent"
              sortable
              filter
              header="Total Students"
            />
            <Column
              field="directorName"
              sortable
              filter
              header="Director Name"
            />
            <Column header="Actions" body={actionBodyTemplate} />
          </DataTable>
        </div>
      )}
    </section>
  );
};

export default CenterAdmins;
