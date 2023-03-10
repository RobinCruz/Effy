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
