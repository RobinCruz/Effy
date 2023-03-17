import React from "react";
import CompanyCreateEditForm from "./CompanyCreateEditForm";
import UserCreateEditForm from "./UserCreateEditForm";
import "./PopUpForm.css";

function PopUpForm({ selectType, popUpType, viewId, openPopUp, setOpenPopUp, getUserList, getCompanyList, handlePopUpClose }) {
  return (
    <>
      {popUpType.includes("usr") ? (
        <UserCreateEditForm
          handlePopUpClose={handlePopUpClose}
          popUpType={popUpType}
          viewId={viewId}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          getUserList={getUserList}
        />
      ) : (
        <CompanyCreateEditForm
          handlePopUpClose={handlePopUpClose}
          popUpType={popUpType}
          viewId={viewId}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          getCompanyList={getCompanyList}
        />
      )}
    </>
  );
}

export default PopUpForm;
