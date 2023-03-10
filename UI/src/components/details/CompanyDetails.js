import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Company from "../company/Company";
import Users from "../users/Users";

function CompanyDetails({
  selectType,
  viewId,
  setOpenPopUp,
  handlePopUpClose,
  setPopUpType,
  setViewId,
  setMessage,
  setOpenError,
}) {
  const [data, setData] = useState({
    id: "77a41bfd3d754b65baf8d1b355907c1e",
    name: "Effy",
    address: "Guindy",
    coordinates: "N125.13 E13.17",
    usersList: [
      { name: "selva", id: 1, companyId: 2 },
      { name: "robin", id: 2, companyId: 3 },
    ],
  });
  useEffect(() => {
    const iframe = document.getElementById("map-frameId");
    const latlon = "13.0872004,80.2164421";
    axios.get("http://localhost:5000/company/" + viewId).then((response) => {
      setData(response.data);
      iframe.src = `https://maps.google.com/maps?q=${response.data.coordinates}&hl=es;&output=embed`;
    });
  }, []);
  return (
    <div className="details-main">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <span className="bold"> Company Name: </span>
          {data.companyname}
        </Grid>
        <Grid item xs={6}>
          <span className="bold">Company Address: </span>
          {data.companyaddress}
        </Grid>
        <Grid item xs={6}>
          <iframe id="map-frameId" className="map-frame"></iframe>
        </Grid>

        <Grid item xs={12}>
          <span className="bold">Users list:</span>
          <br />
          <Users
            isDetails={true}
            usersList={data}
            selectType="usr"
            viewId={viewId}
            setOpenPopUp={setOpenPopUp}
            handlePopUpClose={handlePopUpClose}
            setPopUpType={setPopUpType}
            setViewId={setViewId}
            setMessage={setMessage}
            setOpenError={setOpenError}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CompanyDetails;
