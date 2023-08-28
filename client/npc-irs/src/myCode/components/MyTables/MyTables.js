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
    { field: "status", cellRenderer: MyStatusComp },
    { field: "progress", cellRenderer: MyProgressBarComp },
  ]);

  const [userColumnDefs] = useState([
    { field: "username", cellRenderer: MyUserComp },
    { field: "task amount" },
  ]);

  return (
    <div className={classes.tablesContainer} style={{ height: "100%", width: "100%" }}>
      {/*<MyNavbar />*/}
      <Table
        gridEditAllowed={true}
        gridTitle={"Recent tasks"}
        data={serverData.tasks}
        columnDefs={taskColumnDefs}
      />
      <Table
        gridTitle={"Users"}
        data={serverData.users}
        columnDefs={userColumnDefs}
        width={"400px"}
      />
    </div>
  );
});

export default MyTables;
