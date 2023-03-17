import { Grid, AppBar, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import React from "react";
import UsersDetails from "./UsersDetails";
import CompanyDetails from "./CompanyDetails";
import "./Details.css";
function DetailsBase({
  selectType,
  viewId,
  setOpenPopUp,
  handlePopUpClose,
  setPopUpType,
  setViewId,
  popUpType,
  setMessage,
  setOpenError,
  companyList,
}) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {selectType === "usr" ? "User Details" : "Company Details"}
          </Typography>
          <div className="flex-display">
            <Close
              className="display-flex-right"
              onClick={() => {
                handlePopUpClose();
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className="details-body">
        {popUpType.includes("usr") ? (
          <UsersDetails
            selectType={selectType}
            viewId={viewId}
            setOpenPopUp={setOpenPopUp}
            handlePopUpClose={handlePopUpClose}
            companyList={companyList}
            setPopUpType={setPopUpType}
            setViewId={setViewId}
          />
        ) : (
          <CompanyDetails
            selectType={selectType}
            viewId={viewId}
            setOpenPopUp={setOpenPopUp}
            handlePopUpClose={handlePopUpClose}
            setPopUpType={setPopUpType}
            setViewId={setViewId}
            setMessage={setMessage}
            setOpenError={setOpenError}
          />
        )}
      </div>
    </>
  );
}

export default DetailsBase;
