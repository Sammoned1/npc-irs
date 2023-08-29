/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react";
import classes from "./MyAddNewTaskModal.module.css";
import MyInput from "../../MyInput/MyInput";
import { Context } from "../../../../index";
import { observer } from "mobx-react-lite";
import UserNode from "./UserNode/UserNode";
import MyTextArea from "../../MyTextArea/MyTextArea";
import { createTask } from "../../../http/taskAPI";

const MyAddNewTaskModal = observer(({ isActive, setIsActive }) => {
  const [users, setUsers] = useState([]);
  const { serverData } = useContext(Context);

  const [selectedTask, setSelectedTask] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    if (serverData.users.length) setUsers(serverData.users);
  }, [serverData.users.length]);

  const addTask = () => {
    createTask(selectedTask, selectedDescription, selectedUser.id).then((data) => {
      setIsActive(false);
    });
  };

  return (
    <div className={classes.modal} style={{ display: isActive ? "flex" : "none" }}>
      <div className={classes.modalContentBox}>
        <div className={classes.modalTitle}>Add new task</div>
        <div className={classes.modalContent}>
          <div className={classes.modalInputs}>
            <MyInput text={"Task name"} value={selectedTask} setValue={setSelectedTask} />
            <MyTextArea
              text={"Description"}
              value={selectedDescription}
              setValue={setSelectedDescription}
            />
          </div>
          <div>
            <div className={classes.userListTitle}>Choose user</div>
            <div className={classes.modalUsersList}>
              {users.length
                ? users.map((user) => (
                    <UserNode
                      key={user.id}
                      selectedUser={selectedUser}
                      setSelectedUser={setSelectedUser}
                      user={user}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className={classes.modalBtnContainer}>
          <button
            onClick={() => {
              setIsActive(false);
              setSelectedUser({});
              setSelectedTask("");
              setSelectedDescription("");
            }}
          >
            Cansel
          </button>
          <button onClick={addTask}>Submit</button>
        </div>
      </div>
    </div>
  );
});

export default MyAddNewTaskModal;
