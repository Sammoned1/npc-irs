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
import { deleteTask } from "../../../http/taskAPI";

const Table = observer(
  ({ gridEditAllowed = false, gridTitle = "Plain table", data, columnDefs, width = "100%" }) => {
    const [isModalActive, setIsModalActive] = useState(false);
    const insertOne = useCallback(() => {
      if (!isModalActive) setIsModalActive(true);
    });

    const gridRef = useRef();
    const [isRowSelected, setIsRowSelected] = useState(false);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
      if (data.length) {
        setRowData(data);
      }
    }, [data.length]);

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
      } else setIsRowSelected(true);
    });

    const onFirstDataRendered = useCallback((params) => {
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

    return (
      <div style={{ width: width }}>
        <MyAddNewTaskModal isActive={isModalActive} setIsActive={setIsModalActive} />
        <div className={classes.tablesPage}>
          <div className={classes.tableTitle}>
            <div>{gridTitle}</div>
            {gridEditAllowed ? (
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
            ) : null}
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
  }
);

export default Table;
