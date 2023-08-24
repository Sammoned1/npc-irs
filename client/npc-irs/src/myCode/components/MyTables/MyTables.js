import React, { useMemo, useRef, useState } from "react";
import classes from "./MyTables.module.css";
import MyNavbar from "../MyDashboard/MyNavbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyTables = () => {
  const gridRef = useRef();
  const [rowData] = useState([
    {
      Task: "task 1",
      Description: "desc for task 1",
      Employee: 1,
      Status: "Working",
      Completion: "50%",
      Action: "edit",
    },
    {
      Task: "task 2",
      Description: "desc for task 2",
      Employee: 2,
      Status: "Working",
      Completion: "50%",
      Action: "edit",
    },
    {
      Task: "task 3",
      Description: "desc for task 3",
      Employee: 3,
      Status: "Working",
      Completion: "50%",
      Action: "edit",
    },
  ]);

  const [columnDefs] = useState([
    { field: "Task" },
    { field: "Description" },
    { field: "Employee" },
    { field: "Status" },
    { field: "Completion" },
    { field: "Action" },
  ]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );
  return (
    <div className={classes.tablesPage}>
      <MyNavbar />
      <div className="ag-theme-alpine" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default MyTables;
