import {
  AppBar,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import "./Header.css";

function Header({ selectType, setType }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CompanyUsers
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="type-display-group header-group">
        <span
          className={
            selectType === "usr" ? "header-list selected-header" : "header-list"
          }
          onClick={() => {
            setType("usr");
          }}
        >
          {" "}
          Users
        </span>
        <span
          className={
            selectType === "comp"
              ? "header-list selected-header"
              : "header-list "
          }
          onClick={() => {
            setType("comp");
          }}
        >
          {" "}
          Companies
        </span>
      </div>
    </>
  );
}

export default Header;
