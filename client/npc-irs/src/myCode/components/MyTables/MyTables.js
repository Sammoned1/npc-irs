import React, { useCallback, useMemo, useRef, useState } from "react";
import classes from "./MyTables.module.css";
import MyNavbar from "../MyDashboard/MyNavbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";

const MyTables = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
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

  // const [columnDefs, setColumnDefs] = useState([
  //   { field: "athlete", minWidth: 170 },
  //   { field: "age" },
  //   { field: "country" },
  //   { field: "year" },
  //   { field: "date" },
  //   { field: "sport" },
  //   { field: "gold" },
  //   { field: "silver" },
  //   { field: "bronze" },
  //   { field: "total" },
  // ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      // resizable: true,
      // filter: true,
    }),
    []
  );

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  });

  return (
    <div className={classes.tablesContainer} style={{ height: "100%", width: "100%" }}>
      {/*<MyNavbar />*/}
      <div className={classes.tablesPage}>
        <div className={classes.tableTitle}>Table 1</div>
        <div className={"ag-theme-alpine"} style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            containerStyle={{ width: "100%" }}
            rowStyle={{ width: "100%" }}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection="multiple"
            rowHeight={60}
            onFirstDataRendered={onFirstDataRendered}
            headerHeight={40}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default MyTables;
