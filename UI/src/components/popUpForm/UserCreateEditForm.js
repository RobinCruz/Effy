import { Button, Grid, MenuItem, TextField, AppBar, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserCreateEditForm({ popUpType, viewId, setOpenPopUp, getUserList, handlePopUpClose }) {
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
  ]);
  const [designationList, setdesignation] = useState([
    "Developer",
    "Testing",
    "Junior Developer",
    "Senior Developer",
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
        getUserList();
      });
    } else {
      axios
        .put("http://localhost:5000/user/" + data.id, data)
        .then((response) => {
          console.log(response);
          setOpenPopUp(false);
          getUserList();
        });
    }
  };

  return (
    <div>
      <div className="form-header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {popUpType.includes("create-form")
          ? "Create New User"
          : "Update User Details"}
          </Typography>
          <div className="flex-display">
            <Close
              className="display-flex-right"
              onClick={() => {
                handlePopUpClose();
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      </div>
      <Grid container className="form-basic" spacing={7}>
        <Grid xs={6} item>
          <TextField
            id="first-name-text-field"
            label="First Name"
            variant="standard"
            className="user-form-field"
            value={data.firstname}
            onChange={(e) => {
              handleChangeData(e.target.value, "firstname");
            }}
          />
        </Grid>
        <Grid xs={6} item>
          <TextField
            id="last-name-text-field"
            label="Last Name"
            variant="standard"
            className="user-form-field"
            value={data.lastname}
            onChange={(e) => {
              handleChangeData(e.target.value, "lastname");
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="email-text-field"
            fullWidth
            label="Email"
            variant="standard"
            className="user-form-field"
            type="email"
            value={data.email}
            onChange={(e) => {
              handleChangeData(e.target.value, "email");
            }}
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <TextField
            select
            id="designation-text-field"
            fullWidth
            label="Designation"
            variant="standard"
            className="user-form-field"
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
            className="user-form-field"
            value={data.dob}
            onChange={(e) => {
              handleChangeData(e.target.value, "dob");
            }}
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Button
            variant="outlined"
            className="user-form-field"
            onClick={() => {
              handleCancel();
            }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            className="user-form-field"
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
