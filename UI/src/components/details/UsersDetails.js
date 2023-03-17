import { Button, Grid, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UsersDetails({
  selectType,
  viewId,
  setOpenPopUp,
  handlePopUpClose,
  setPopUpType,
  setViewId,
  companyList,
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [data, setData] = useState({});
  const handleChangeData = (value, key) => {
    setIsEdited(true);
    setData((pre) => {
      pre[key] = value;
      return { ...pre };
    });
  };
  const handleChangeTeam = () => {
    axios
      .post("http://localhost:5000/user_company/" + viewId, {
        company_id: data.company_id,
      })
      .then((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/user/" + viewId).then((response) => {
      let temp = { ...response.data };
      if (response.data.company_id != null) {
        temp.company_id = response.data.company_id[0];
      }
      setData(temp);
    });
  }, []);
  return (
    <div className="details-main">
      <Grid container spacing={7}>
        <Grid item xs={4}>
          Name:
          {data.firstname + " " + data.lastname}
        </Grid>
        <Grid item xs={4}>
          E-Mail: {data.email}
        </Grid>
        <Grid item xs={4}>
          D.O.B: {data.dob}
        </Grid>
        <Grid item xs={4}>
          Designation: {data.designation}
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            id="Company-text-feild"
            label="Company"
            variant="standard"
            fullWidth
            defaultValue={data.company_id}
            value={data.company_id}
            onChange={(e) => {
              handleChangeData(e.target.value, "company_id");
            }}
          >
            {companyList.map((element) => (
              <MenuItem value={element.id} key={element.id}>
                {element.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            className="company-form-field"
            onClick={() => {
              handleChangeTeam();
            }}
          >
            {" "}
            Change Company
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default UsersDetails;
