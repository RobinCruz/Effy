import { Close } from "@mui/icons-material";
import { Backdrop } from "@mui/material";
import React from "react";
import "./ErrorMessage.css";

function ErrorMessage({ setOpenError, errorMessage, openError }) {
  const handlePopUpClose = () => {
    setOpenError(false);
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openError}
      >
        <div className="error-main">
          <div className="flex-display">
            <Close
              className="display-flex-right"
              onClick={() => {
                handlePopUpClose();
              }}
            />
          </div>
          <br />
          <div className="error-popup-message">{errorMessage}</div>
        </div>
      </Backdrop>
    </>
  );
}

export default ErrorMessage;
