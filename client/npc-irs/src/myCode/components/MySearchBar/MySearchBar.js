import React, { useEffect, useRef } from "react";
import classes from "./MySearchBar.module.css";

const MySearchBar = () => {
  return (
    <div className={classes.searchBarContainer}>
      {/*<input required type="text" className={classes.searchBar} />*/}
      {/*<span className={classes.placeholder}>Search here</span>*/}
      <div className={classes.inputContainer}>
        <input type="text" id={"mySearchInput"} className={classes.searchInput} />
        <label htmlFor="mySearchInput">Search here</label>
        <fieldset>
          <legend>
            <span>Search here</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
};

export default MySearchBar;
