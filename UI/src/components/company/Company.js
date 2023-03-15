import React, { useCallback } from "react";
import DisplayCardList from "../displayCardList/DisplayCardList";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import "./Company.css";
import axios from "axios";

function Company({
  setOpenPopUp,
  companyList,
  setPopUpType,
  setViewId,
  isDetails,
  setMessage,
  setOpenError,
  getCompanyList,
  selectType
}) {
  const handleDelete = (id) => {
    console.log("delete company: " + id);
    axios.delete("http://localhost:5000/company/" + id).then((response) => {
      console.log(response);
      getCompanyList();
    });
  };
  const handleView = (id) => {
    console.log("view company: " + id);
    setOpenPopUp(true);
    setPopUpType("comp-list");
    setViewId(id);
  };
  const handleUpdate = (id) => {
    console.log("update company: " + id);
    setOpenPopUp(true);
    setPopUpType("comp-edit-form");
    setViewId(id);
  };
  function handleCreateCompany() {
    console.log("create company: ");
    setOpenPopUp(true);
    setPopUpType("comp-create-form");
  }
  const handleRemove = () => {
    console.log("remove company: not needed ");
  };
  return (
    <>
      <div className="flex-display">
        <Button
          variant="contained"
          className="display-flex-right create-button"
          onClick={() => {
            handleCreateCompany();
          }}
        >
          Create new Company
        </Button>
      </div>
      <DisplayCardList
        listValue={companyList}
        handleDelete={handleDelete}
        handleView={handleView}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
        isDetails={isDetails}
        selectType={selectType}
      />
    </>
  );
}

export default Company;
