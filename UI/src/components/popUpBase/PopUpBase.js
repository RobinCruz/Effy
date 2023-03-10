import { Close } from "@mui/icons-material";
import { Backdrop } from "@mui/material";
import React, { useEffect } from "react";
import PopUpForm from "../popUpForm/PopUpForm";
import "./PopUpBase.css";
import DetailsBase from "../details/DetailsBase";

function PopUpBase({
  handlePopUpClose,
  openPopUp,
  selectType,
  popUpType,
  viewId,
  setOpenPopUp,
  setPopUpType,
  setViewId,
  setMessage,
  setOpenError,
  companyList,
}) {
  useEffect(() => {
    console.log(viewId);
  }, []);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openPopUp}
    >
      <div className="popup-form-main  ">
        <div className="flex-display">
          <Close
            className="display-flex-right"
            onClick={() => {
              handlePopUpClose();
            }}
          />
        </div>
        <br />
        {[
          "usr-create-form",
          "usr-edit-form",
          "comp-create-form",
          "comp-edit-form",
        ].includes(popUpType) && (
          <PopUpForm
            selectType={selectType}
            popUpType={popUpType}
            viewId={viewId}
            openPopUp={openPopUp}
            setOpenPopUp={setOpenPopUp}
          />
        )}
        {popUpType.includes("list") && (
          <DetailsBase
            selectType={selectType}
            popUpType={popUpType}
            viewId={viewId}
            setOpenPopUp={setOpenPopUp}
            handlePopUpClose={handlePopUpClose}
            setPopUpType={setPopUpType}
            setViewId={setViewId}
            setMessage={setMessage}
            setOpenError={setOpenError}
            companyList={companyList}
          />
        )}
      </div>
    </Backdrop>
  );
}

export default PopUpBase;
