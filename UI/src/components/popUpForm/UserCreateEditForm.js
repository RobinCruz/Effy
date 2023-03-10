import { Button, Grid, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserCreateEditForm({ popUpType, viewId, setOpenPopUp }) {
  const currentDate = new Date();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    eMail: "",
    dob:
      currentDate.getFullYear() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getDate(),
    designation: "",
    active: "",
    companyId: "",
  });
  const [companyList, setCompanyList] = useState([
    { id: 1, value: "effy" },
    { id: 2, value: "Accenture" },
    { id: 3, value: "Mindtree" },
  ]);
  const [designationList, setdesignation] = useState([
    "developer",
    "testing",
    "junior developer",
    "senior developer",
  ]);

  useEffect(() => {
    if (!popUpType.includes("create-form")) {
      axios.get("http://localhost:5000/user/" + viewId).then((response) => {
        setData(response.data);
      });
    }
  }, []);

  const handleChangeData = (value, key) => {
    setData((pre) => {
      pre[key] = value;
      return { ...pre };
    });
  };
  const handleCancel = () => {
    if (!popUpType.includes("create-form")) {
      setOpenPopUp(false);
    } else {
      setData({
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        designation: "",
      });
    }
  };
  const handleSave = () => {
    if (data.id === undefined) {
      axios.post("http://localhost:5000/user", data).then((response) => {
        console.log(response);
        setOpenPopUp(false);
      });
    } else {
      axios
        .put("http://localhost:5000/user/" + data.id, data)
        .then((response) => {
          console.log(response);
          setOpenPopUp(false);
        });
    }
  };

  return (
    <div>
      <div className="form-header">
        {popUpType.includes("create-form")
          ? "Create New User"
          : "Update User Details"}
      </div>
      <Grid container className="form-basic" spacing={7}>
        <Grid xs={4} item>
          <TextField
            id="first-name-text-felid"
            fullWidth
            label="First Name"
            variant="standard"
            value={data.firstname}
            onChange={(e) => {
              handleChangeData(e.target.value, "firstname");
            }}
          />
        </Grid>
        <Grid xs={4} item>
          <TextField
            id="last-name-text-felid"
            fullWidth
            label="Last Name"
            variant="standard"
            value={data.lastname}
            onChange={(e) => {
              handleChangeData(e.target.value, "lastname");
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="email-text-felid"
            fullWidth
            label="Email"
            variant="standard"
            type="email"
            value={data.email}
            onChange={(e) => {
              handleChangeData(e.target.value, "email");
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            id="designation-text-felid"
            fullWidth
            label="Designation"
            variant="standard"
            value={data.designation}
            onChange={(e) => {
              handleChangeData(e.target.value, "designation");
            }}
          >
            {designationList.map((element) => (
              <MenuItem value={element} key={element}>
                {element}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="date"
            fullWidth
            required
            label="D.O.B"
            variant="standard"
            value={data.dob}
            onChange={(e) => {
              handleChangeData(e.target.value, "dob");
            }}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            className="company-form-field"
            onClick={() => {
              handleCancel();
            }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            className="company-form-field"
            onClick={() => {
              handleSave();
            }}
          >
            {popUpType.includes("create-form") ? "create" : "Update"}
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

export default UserCreateEditForm;
