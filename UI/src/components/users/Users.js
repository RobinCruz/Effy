import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import DisplayCardList from "../displayCardList/DisplayCardList";

function Users({
  isDetails,
  setOpenPopUp,
  usersList,
  setPopUpType,
  setViewId,
  setMessage,
  setOpenError,
  getUserList,
  selectType
}) {
  const handleDelete = (id) => {
    console.log("delete user: " + id);
    axios.delete("http://localhost:5000/user/" + id).then((response) => {
      console.log(response);
      getUserList();
    });
  };
  const handleView = (id) => {
    console.log("view user: " + id);
    setOpenPopUp(true);
    setPopUpType("usr-list");
    setViewId(id);
  };
  const handleUpdate = (id) => {
    console.log("update user: " + id);
    setOpenPopUp(true);
    setPopUpType("usr-edit-form");
    setViewId(id);
  };
  const handleRemove = (id) => {
    console.log("remove user: " + id);
    axios
      .delete("http://localhost:5000/user_company/" + id)
      .then((response) => {
        console.log(response);
        setOpenPopUp(false);
      });
  };
  function handleCreateUser() {
    console.log("create user: ");
    setOpenPopUp(true);
    setPopUpType("usr-create-form");
  }
  return (
    <>
      {!isDetails && (
        <div className="flex-display">
          <Button
            variant="contained"
            className="display-flex-right create-button"
            onClick={() => {
              handleCreateUser();
            }}
          >
            Create new User
          </Button>
        </div>
      )}

      <DisplayCardList
        listValue={usersList.usersList}
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

export default Users;
