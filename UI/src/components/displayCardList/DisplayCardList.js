import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import DisplayCard from "../displayCard/DisplayCard";
import "./DisplayCardList.css";

function DisplayCardList({
  listValue,
  handleUpdate,
  handleDelete,
  handleView,
  handleRemove,
  isDetails,
  selectType
}) {
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    console.log(listValue);
  }, []);
  const handleChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };
  return (
    <div className="display-card-list-main">
      { 
        selectType !== "usr" ?
        <div className="display-card-list-body">
        <h1>Companies</h1>
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1cvar52ffvcvI2Cm5IBNcMCM7jp1xpcQ&ehbc=2E312F" 
        width="640" height="420"></iframe></div> : null
      }
      <br></br>
      <TextField
        id="filter-text-felid"
        label="filter"
        variant="standard"
        value={filterValue}
        className="display-list-filter"
        onChange={handleChangeFilter}
      />
      <div className="display-card-list-body">
        {listValue
          .filter((e) =>
            e.name.toLowerCase().includes(filterValue.toLowerCase())
          )
          .map((element) => (
            <DisplayCard
              key={element.id}
              value={element}
              handleDelete={handleDelete}
              handleView={handleView}
              handleUpdate={handleUpdate}
              isDetails={isDetails}
              handleRemove={handleRemove}
            />
          ))}
      </div>
    </div>
  );
}

export default DisplayCardList;
