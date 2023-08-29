/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react";
import classes from "./MyAddNewTaskModal.module.css";
import MyInput from "../../MyInput/MyInput";
import { Context } from "../../../../index";
import { observer } from "mobx-react-lite";
import UserNode from "./UserNode/UserNode";
import MyTextArea from "../../MyTextArea/MyTextArea";

const MyAddNewTaskModal = observer(({ isActive, setIsActive }) => {
  const [users, setUsers] = useState([]);
  const { serverData } = useContext(Context);
  useEffect(() => {
    if (serverData.users.length) setUsers(serverData.users);
  }, [serverData.users.length]);

  const [selectedUser, setSelectedUser] = useState({});

  return (
    <div className={classes.modal} style={{ display: isActive ? "flex" : "none" }}>
      <div className={classes.modalContentBox}>
        <div className={classes.modalTitle}>Add new task</div>
        <div className={classes.modalContent}>
          <div className={classes.modalInputs}>
            <MyInput text={"Task name"} />
            <MyTextArea text={"Description"} />
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
            }}
          >
            Cansel
          </button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
});

export default MyAddNewTaskModal;
