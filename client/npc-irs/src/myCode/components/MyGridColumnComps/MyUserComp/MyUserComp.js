import React, { useEffect, useState } from "react";
import classes from "./MyUserComp.module.css";
import { getUser } from "../../../http/userAPI";
import { observer } from "mobx-react-lite";

const MyUserComp = observer((p) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (p.data) {
      if (p.data.user_id) {
        getUser(p.data.user_id).then((data) => {
          setUser(data.user);
        });
      } else if (p.value) {
        setUser({ username: p.value });
      }
    }
  }, []);

  return (
    <div className={classes.myUserComp}>
      <div className={classes.usernameBox}>{user.username}</div>
    </div>
  );
});

export default MyUserComp;
