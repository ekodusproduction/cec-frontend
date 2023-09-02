import { DataGrid } from "@mui/x-data-grid";
import styles from "./Table.module.css";

const Table = ({ columns, rows }) => {
  return (
    <div className={styles.tableContainer}>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ fontSize: 16, width: "100%" }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 8, 10]}
      />
    </div>
  );
};

export default Table;
