/* eslint-disable react/prop-types */

import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import MyAddNewTaskModal from "../../Modals/MyAddNewTaskModal/MyAddNewTaskModal";
import classes from "./Table.module.css";
import { AgGridReact } from "ag-grid-react";
import MyTaskComp from "../../MyGridColumnComps/MyTaskComp/MyTaskComp";
import MyDescriptionComp from "../../MyGridColumnComps/MyDescriptionComp/MyDescriptionComp";
import MyUserComp from "../../MyGridColumnComps/MyUserComp/MyUserComp";
import MyStatusComp from "../../MyGridColumnComps/MyStatusComp/MyStatusComp";
import MyProgressBarComp from "../../MyGridColumnComps/MyProgressBarComp/MyProgressBarComp";
import { Context } from "../../../../index";
import { observer } from "mobx-react-lite";
import { deleteTask, getAllTasks } from "../../../http/taskAPI";
import { limit } from "chroma-js/src/utils";

const Table = observer(
  ({
    gridAddAllowed = false,
    gridEditAllowed = false,
    gridDeleteAllowed = false,
    gridTitle = "Plain table",
    data,
    rowModelType,
    columnDefs,
    width = "100%",
    dataSource,
  }) => {
    const serverData = useContext(Context);
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    const insertOne = useCallback(() => {
      if (!isModalActive) setIsModalActive(true);
    });

    useEffect(() => {
      if (data && rowModelType === "clientSide") {
        if (gridRef.current.api) gridRef.current.api.setRowData(data);
      }
    }, [data, gridRef.current]);

    const defaultColDef = useMemo(
      () => ({
        sortable: true,
      }),
      []
    );

    const onRowClicked = useCallback((params) => {
      const selectedNodes = gridRef.current.api.getSelectedNodes().map((node) => node.data);
      if (!selectedNodes.length) {
        setIsRowSelected(false);
        setToggleEdit(false);
      } else {
        {
          if (selectedNodes.length === 1) setToggleEdit(true);
          else setToggleEdit(false);
          setIsRowSelected(true);
        }
      }
    });

    const onGridReady = useCallback((params) => {
      if (rowModelType === "infinite") {
        if (params.api) params.api.setDatasource(dataSource);
      } else {
        // if (params.api) params.api.setRowData(data);
      }

      gridRef.current.api.sizeColumnsToFit();
    });

    const getRowId = useCallback((params) => {
      return params.data.id;
    });

    const onRemove = useCallback(() => {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedIds = selectedNodes.map((node) => node.data.id);
      setRowData(rowData.filter((row) => selectedIds.indexOf(row.id) < 0));
      deleteTask(selectedIds).then((data) => {});
      setIsRowSelected(false);
    });

    const [selectedRow, setSelectedRow] = useState({});
    const [iseEdit, setIsEdit] = useState(false);

    const onEdit = useCallback((e) => {
      setIsEdit(true);
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      setSelectedRow(selectedNodes[0].data);
      setIsModalActive(true);
    });

    // const onGridReady = () => {};

    return (
      <div style={{ width: width }}>
        <MyAddNewTaskModal
          isActive={isModalActive}
          setIsActive={setIsModalActive}
          selectedRow={selectedRow}
          isEdit={iseEdit}
        />
        <div className={classes.tablesPage}>
          <div className={classes.tableTitle}>
            <div>{gridTitle}</div>
            <div className={classes.titleBtnContainer}>
              {gridAddAllowed ? (
                <button className={classes.addBtn} onClick={insertOne}>
                  Add
                </button>
              ) : null}
              {gridEditAllowed ? (
                <button
                  className={classes.editBtn}
                  disabled={!toggleEdit}
                  onClick={(e) => {
                    onEdit(e);
                  }}
                >
                  Edit
                </button>
              ) : null}
              {gridDeleteAllowed ? (
                <button className={classes.deleteBtn} onClick={onRemove} disabled={!isRowSelected}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>
          <div className={"ag-theme-alpine"} style={{ height: "500px", width: "100%" }}>
            <AgGridReact
              ref={gridRef}
              getRowId={getRowId}
              containerStyle={{ width: "100%" }}
              rowStyle={{ width: "100%" }}
              columnDefs={columnDefs}
              // rowData={rowData}
              defaultColDef={defaultColDef}
              animateRows={true}
              rowSelection={"multiple"}
              rowHeight={60}
              onGridReady={onGridReady}
              headerHeight={40}
              onRowClicked={onRowClicked}
              rowModelType={rowModelType}
              maxConcurrentDatasourceRequests={1}
              infiniteInitialRowCount={100}
              // rowModelType={"infinite"}
            ></AgGridReact>
          </div>
        </div>
      </div>
    );
  }
);

export default Table;
