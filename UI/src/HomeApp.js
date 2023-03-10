import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Users from "./components/users/Users";
import Company from "./components/company/Company";
import { Backdrop } from "@mui/material";
import PopUpBase from "./components/popUpBase/PopUpBase";
import axios from "axios";
import ErrorMessage from "./components/errorMessage/ErrorMessage";

function HomeApp() {
  const [selectType, setType] = useState("usr");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState("");
  const [viewId, setViewId] = useState("1");
  const [errorMessage, setMessage] = useState("here comes error");
  const [openError, setOpenError] = useState(false);
  const [usersList, setUsersList] = useState({
    usersList: [
      { name: "selva", id: 1, companyId: 2 },
      { name: "robin", id: 2, companyId: 3 },
      { name: "soumya", id: 3, companyId: 1 },
      { name: "selva  fg", id: 4, companyId: 2 },
      { name: "robin fgf", id: 5, companyId: 3 },
      { name: "soumya fghf", id: 7, companyId: 1 },
      { name: "selva sdefsdf", id: 8, companyId: 2 },
      { name: "robin sdfgs ", id: 9, companyId: 3 },
      { name: "soumya sdfgsrfgs", id: 10, companyId: 1 },
    ],
  });
  const [companyList, setCompanyList] = useState([
    { id: "77a41bfd3d754b65baf8d1b355907c1e", name: "Effy" },
    { id: "77a41bfd3d754b65baf8d1b355907jj", name: "Accenture" },
  ]);

  useEffect(() => {
    getUserList();
    getCompanyList();
  }, []);
  const getUserList = () => {
    axios.get("http://localhost:5000/users").then((response) => {
      console.log(response);
      setUsersList(response.data);
    });
  };
  const getCompanyList = () => {
    axios.get("http://localhost:5000/companies").then((response) => {
      console.log(response);
      setCompanyList(response.data.companies);
    });
  };
  const handlePopUpClose = () => {
    setOpenPopUp(false);
    setPopUpType("");
  };

  return (
    <>
      <Header setType={setType} selectType={selectType} />
      {selectType === "usr" ? (
        <Users
          isDetails={false}
          usersList={usersList}
          setOpenPopUp={setOpenPopUp}
          setPopUpType={setPopUpType}
          setViewId={setViewId}
          setOpenError={setOpenError}
          setMessage={setMessage}
          getUserList={getUserList}
        />
      ) : (
        <Company
          isDetails={false}
          companyList={companyList}
          setOpenPopUp={setOpenPopUp}
          setPopUpType={setPopUpType}
          setViewId={setViewId}
          setOpenError={setOpenError}
          setMessage={setMessage}
          getCompanyList={getCompanyList}
        />
      )}

      <PopUpBase
        selectType={selectType}
        handlePopUpClose={handlePopUpClose}
        openPopUp={openPopUp}
        popUpType={popUpType}
        viewId={viewId}
        setViewId={setViewId}
        setPopUpType={setPopUpType}
        companyList={companyList}
        getCompanyList={getCompanyList}
        getUserList={getUserList}
        setOpenPopUp={setOpenPopUp}
        setOpenError={setOpenError}
        setMessage={setMessage}
      />
      {openError && (
        <ErrorMessage
          errorMessage={errorMessage}
          setOpenError={setOpenError}
          openError={openError}
        />
      )}
    </>
  );
}

export default HomeApp;
