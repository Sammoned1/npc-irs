import React, { useEffect, useRef } from "react";
import classes from "./MySearchBar.module.css";

const MySearchBar = () => {
  return (
    <div className={classes.searchBarContainer}>
      {/*<input required type="text" className={classes.searchBar} />*/}
      {/*<span className={classes.placeholder}>Search here</span>*/}
      <label htmlFor="mySearchInput" className={classes.label}>
        Search here
      </label>
      <div className={classes.inputContainer}>
        <input type="text" id={"mySearchInput"} className={classes.searchInput} />
        <fieldset className={classes.fieldset}>
          <legend className={classes.legend}>
            <span className={classes.span}>Search here</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
};

export default MySearchBar;
