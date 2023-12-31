import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import classes from "./MyTables.module.css";
import MyNavbar from "../MyNavbar/MyNavbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import MyTaskComp from "../MyGridColumnComps/MyTaskComp/MyTaskComp";
import MyProgressBarComp from "../MyGridColumnComps/MyProgressBarComp/MyProgressBarComp";
import MyStatusComp from "../MyGridColumnComps/MyStatusComp/MyStatusComp";
import MyDescriptionComp from "../MyGridColumnComps/MyDescriptionComp/MyDescriptionComp";
import MyAddNewTaskModal from "../Modals/MyAddNewTaskModal/MyAddNewTaskModal";
import { getAllTasks } from "../../http/taskAPI";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import MyUserComp from "../MyGridColumnComps/MyUserComp/MyUserComp";
import Table from "./Table/Table";
import MyTaskAmountComp from "../MyGridColumnComps/MyTaskAmountComp/MyTaskAmountComp";
import { getAllUsers } from "../../http/userAPI";

const MyTables = observer(() => {
  const { serverData } = useContext(Context);

  const [taskColumnDefs] = useState([
    { field: "task", cellRenderer: MyTaskComp },
    { field: "description", cellRenderer: MyDescriptionComp, wrapText: true, autoHeight: true },
    {
      field: "userId",
      cellRenderer: MyUserComp,
      headerComponentParams: { displayName: "employee" },
    },
    { field: "progress", cellRenderer: MyProgressBarComp },
    { field: "status", cellRenderer: MyStatusComp },
  ]);

  const [userColumnDefs] = useState([
    { field: "username", cellRenderer: MyUserComp },
    { field: "overallProgress", cellRenderer: MyProgressBarComp },
    { field: "taskAmount", cellRenderer: MyTaskAmountComp },
  ]);

  const [unassignedTasksColumnDefs] = useState([
    { field: "task", cellRenderer: MyTaskComp },
    { field: "description", cellRenderer: MyDescriptionComp, wrapText: true, autoHeight: true },
    { field: "progress", cellRenderer: MyProgressBarComp },
    { field: "status", cellRenderer: MyStatusComp },
  ]);

  const tasksDataSource = {
    rowCount: null,
    getRows: (params) => {
      setTimeout(() => {
        let limit = params.endRow - params.startRow;
        let offset = params.startRow;
        getAllTasks(limit, offset).then((data) => {
          let lastRow = -1;
          if (data.length === 0) {
            lastRow = params.startRow;
          }
          // serverData.setUsers(data)
          params.successCallback(data, lastRow);
        });
      }, 500);
    },
  };

  const usersDataSource = {
    rowCount: null,
    getRows: (params) => {
      setTimeout(() => {
        let limit = params.endRow - params.startRow;
        let offset = params.startRow;
        getAllUsers(limit, offset).then((data) => {
          let lastRow = -1;
          if (data.length === 0) {
            lastRow = params.startRow;
          }
          params.successCallback(data, lastRow);
        });
      }, 500);
    },
  };

  return (
    <div className={classes.tablesContainer} style={{ height: "100%", width: "100%" }}>
      {/*<MyNavbar />*/}
      <div style={{ display: "flex", gap: 24 }}>
        <Table
          gridAddAllowed={true}
          gridEditAllowed={true}
          gridDeleteAllowed={true}
          gridTitle={"Recent tasks"}
          columnDefs={taskColumnDefs}
          dataSource={tasksDataSource}
          rowModelType={"infinite"}
        />
        <Table
          gridTitle={"Users"}
          data={serverData.users}
          columnDefs={userColumnDefs}
          width={"600px"}
          dataSource={usersDataSource}
          rowModelType={"infinite"}
        />
      </div>
      <Table
        gridEditAllowed={true}
        gridDeleteAllowed={true}
        gridTitle={"Unassigned tasks"}
        columnDefs={unassignedTasksColumnDefs}
        data={serverData.unassignedTasks}
        rowModelType={"clientSide"}
      />
    </div>
  );
});

export default MyTables;
