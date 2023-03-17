import {
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  TextareaAutosize,
  TextField,
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";
import { Close } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import "./PopUpForm.css";

function CompanyCreateEditForm({ popUpType, viewId, openPopUp, setOpenPopUp, getCompanyList, handlePopUpClose }) {
  const [data, setData] = useState({
    companyname: "",
    companyaddress: "",
    coordinates: "",
  });
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (!popUpType.includes("create-form")) {
      axios.get("http://localhost:5000/company/" + viewId).then((response) => {
        setData(response.data);
      });
    }
  }, []);
  const handleChangeData = (value, key) => {
    setData((pre) => {
      pre[key] = value;
      if (key == "companyaddress") {
        pre.coordinates = "";
      }
      return { ...pre };
    });
  };
  const handleCancel = () => {
    if (!popUpType.includes("create-form")) {
      setOpenPopUp(false);
    } else {
      setData({
        companyname: "",
        companyaddress: "",
        coordinates: "",
      });
    }
  };
  const handleSave = async () => {
    axios
      .get("https://geocode.maps.co/search?q=" + data.companyaddress)
      .then((response) => {
        console.log(response);
        if (data.id === undefined) {
          axios.post("http://localhost:5000/company", {...data, coordinates:response.data[0].lat + "," + response.data[0].lon})
          .then((response) => {
            console.log(response);
            setOpenPopUp(false);
            getCompanyList();
          });
        } else {
          axios
            .put("http://localhost:5000/company/" + data.id, {...data, coordinates:response.data[0].lat + "," + response.data[0].lon})
            .then((response) => {
              console.log(response);
              setOpenPopUp(false);
              getCompanyList();
            });
        }
      });
  };
  return (
    <div>
      <div className="form-header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {popUpType.includes("create-form")
          ? "Create New Company"
          : "Update Company Details"}
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
      <Grid container className="form-basic" colSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            id="name-text-feild"
            label="Company Name"
            variant="standard"
            className="company-form-field"
            value={data.companyname}
            onChange={(e) => {
              handleChangeData(e.target.value, "companyname");
            }}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            placeholder="Enter your complete address"
            label="Address"
            multiline
            className="company-form-field"
            value={data.companyaddress}
            onChange={(e) => {
              handleChangeData(e.target.value, "companyaddress");
            }}
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <Button
            className="company-form-field"
            variant="outlined"
            onClick={() => {
              handleCancel();
            }}
          >
            cancel
          </Button>
          <Button
            className="company-form-field"
            variant="contained"
            onClick={() => {
              handleSave();
            }}
          >
            {popUpType.includes("create-form") ? "create" : "Update"}
          </Button>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoad}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default CompanyCreateEditForm;
