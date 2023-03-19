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
    id: "",
    name: "",
    address: "",
    coordinates: "",
    usersList: [{}],
  });
  useEffect(() => {
    const iframe = document.getElementById("map-frameId");
    axios.get("http://localhost:5000/company/" + viewId).then((response) => {
      setData(response.data);
      iframe.src = `https://maps.google.com/maps?q=${response.data.coordinates}&hl=es;&output=embed`;
    });
  }, []);
  return (
    <div className="details-main">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <span className="head">Company Name</span> <br></br><br></br>
          <span className="value">{data.companyname}</span> <br></br><br></br>
        {/* </Grid>
        <Grid item xs={6}> */}
          <span className="head">Company Address</span> <br></br><br></br>
          <span className="value">{data.companyaddress}</span>
        </Grid>
        <Grid item xs={8}>
          <iframe id="map-frameId" className="map-frame"></iframe>
        </Grid>

        <Grid item xs={12}>
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
