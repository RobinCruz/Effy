import React from "react";
import CompanyCreateEditForm from "./CompanyCreateEditForm";
import UserCreateEditForm from "./UserCreateEditForm";
import "./PopUpForm.css";

function PopUpForm({ selectType, popUpType, viewId, openPopUp, setOpenPopUp }) {
  return (
    <>
      {popUpType.includes("usr") ? (
        <UserCreateEditForm
          popUpType={popUpType}
          viewId={viewId}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
        />
      ) : (
        <CompanyCreateEditForm
          popUpType={popUpType}
          viewId={viewId}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
        />
      )}
    </>
  );
}

export default PopUpForm;
