/* eslint-disable react/prop-types */

import React from "react";
import classes from "./UserNode.module.css";
import { observer } from "mobx-react-lite";

const UserNode = observer(({ selectedUser, setSelectedUser, user }) => {
  return (
    <div
      className={
        selectedUser.id === user.id ? classes.userNode + " " + classes.active : classes.userNode
      }
      key={user.id}
      onClick={() => {
        setSelectedUser(user);
      }}
      style={
        selectedUser.id === user.id
          ? {
              borderColor: "#4285F4",
            }
          : {}
      }
    >
      {user.username}
    </div>
  );
});

export default UserNode;
