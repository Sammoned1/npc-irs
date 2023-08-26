import React, { useEffect, useState } from "react";
import classes from "./MyNavbar.module.css";
import MyInput from "../MyInput/MyInput";

const MyNavbar = () => {
  const [isActive, setIsActive] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY) setIsActive(true);
    else setIsActive(false);
    // console.log(window.scrollY);
    // console.log("scroll");
  });

  return (
    <div
      className={!isActive ? classes.titleContainer : classes.titleContainer + " " + classes.active}
    >
      <div className={classes.titleBox}>
        <div>
          <div className={classes.navigateBar}>
            <span className={classes.navigateBar__homeIcon}></span>
            <span className={classes.navigateBar__divider}>/</span>
            <span className={classes.navigateBar__position}>Tables</span>
          </div>
          <h6 className={classes.title}>Tables</h6>
        </div>
        <div>
          <div className={classes.toolBox}>
            <MyInput text={"Search here"} />
            <div className={classes.buttonContainer}>
              <div className={classes.toolBtn}>
                <div className={classes.profileIcon}></div>
              </div>
              <div className={classes.toolBtn}>
                <div className={classes.settingsIcon}></div>
              </div>
              <div className={classes.toolBtn}>
                <div className={classes.notificationIcon}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
