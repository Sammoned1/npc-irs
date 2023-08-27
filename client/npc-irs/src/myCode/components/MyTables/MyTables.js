import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import classes from "./MyTables.module.css";
import MyNavbar from "../MyNavbar/MyNavbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import MyTaskComp from "../MyTaskComp/MyTaskComp";
import MyProgressBarComp from "../MyProgressBarComp/MyProgressBarComp";
import MyStatusComp from "../MyStatusComp/MyStatusComp";
import MyDescriptionComp from "../MyDescriptionComp/MyDescriptionComp";
import MyAddNewTaskModal from "../MyAddNewTaskModal/MyAddNewTaskModal";
import { getAllTasks } from "../../http/taskAPI";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";

const MyTables = observer(() => {
  const gridRef = useRef();
  const [sequence, setSequence] = useState(4);
  const [isRowSelected, setIsRowSelected] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { field: "task", cellRenderer: MyTaskComp },
    { field: "description", cellRenderer: MyDescriptionComp, wrapText: true, autoHeight: true },
    { field: "userId", headerComponentParams: { displayName: "employee" } },
    { field: "status", cellRenderer: MyStatusComp },
    { field: "progress", cellRenderer: MyProgressBarComp },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const onRowClicked = useCallback((params) => {
    const selectedNodes = gridRef.current.api.getSelectedNodes().map((node) => node.data);
    console.log(selectedNodes.length);
    if (!selectedNodes.length) {
      setIsRowSelected(false);
    } else setIsRowSelected(true);
  });

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  });

  const insertOne = useCallback(() => {
    if (!isModalActive) setIsModalActive(true);
  });

  const getRowId = useCallback((params) => {
    return params.data.id;
  });

  const onRemove = useCallback(() => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedIds = selectedNodes.map((node) => node.data.id);
    setRowData(rowData.filter((row) => selectedIds.indexOf(row.id) < 0));
    setIsRowSelected(false);
  });

  const { serverData } = useContext(Context);

  useEffect(() => {
    if (serverData.tasks.length) {
      setRowData(serverData.tasks);
    }
  }, [serverData.tasks.length]);

  return (
    <div className={classes.tablesContainer} style={{ height: "100%", width: "100%" }}>
      {/*<MyNavbar />*/}
      <MyAddNewTaskModal isActive={isModalActive} setIsActive={setIsModalActive} />
      <div className={classes.tablesPage}>
        <div className={classes.tableTitle}>
          <div>Table 1</div>
          <div className={classes.titleBtnContainer}>
            <button className={classes.addBtn} onClick={insertOne}>
              Add
            </button>
            <button className={classes.editBtn} disabled={!isRowSelected}>
              Edit
            </button>
            <button className={classes.deleteBtn} onClick={onRemove} disabled={!isRowSelected}>
              Delete
            </button>
          </div>
        </div>
        <div className={"ag-theme-alpine"} style={{ height: "500px", width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            getRowId={getRowId}
            containerStyle={{ width: "100%" }}
            rowStyle={{ width: "100%" }}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            rowSelection={"multiple"}
            rowHeight={60}
            onFirstDataRendered={onFirstDataRendered}
            headerHeight={40}
            onRowClicked={onRowClicked}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
});

export default MyTables;
