import { Grid } from "@mui/material";
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
      <div className="details-header">
        {selectType === "usr" ? "User Details" : "Company Details"}
      </div>
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
