import React from "react";
import CompanyCreateEditForm from "./CompanyCreateEditForm";
import UserCreateEditForm from "./UserCreateEditForm";
import "./PopUpForm.css";

function PopUpForm({ selectType, popUpType, viewId, openPopUp, setOpenPopUp, getUserList, getCompanyList }) {
  return (
    <>
      {popUpType.includes("usr") ? (
        <UserCreateEditForm
          popUpType={popUpType}
          viewId={viewId}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          getUserList={getUserList}
        />
      ) : (
        <CompanyCreateEditForm
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
