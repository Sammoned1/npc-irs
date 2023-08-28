import React, { useEffect, useState } from "react";
import classes from "./MyUserComp.module.css";
import { getUser } from "../../../http/userAPI";
import { observer } from "mobx-react-lite";

const MyUserComp = observer((p) => {
  // console.log(p.data);
  const [user, setUser] = useState({});
  console.log(p.data);
  useEffect(() => {
    if (p.data.userId) {
      getUser(p.data.userId).then((data) => {
        setUser(data.user);
      });
    } else if (p.data.username) {
      getUser(p.data.id).then((data) => {
        setUser(data.user);
      });
    }
  }, []);

  return (
    <div className={classes.myUserComp}>
      <div className={classes.usernameBox}>{user.username}</div>
    </div>
  );
});

export default MyUserComp;
