import { Delete, Edit } from "@mui/icons-material";
import { Card } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import React from "react";
import "./DisplayCard.css";
function DisplayCard({
  value,
  handleUpdate,
  handleDelete,
  handleView,
  handleRemove,
  isDetails,
}) {
  return (
    <>
      <Card variant="outlined" className="display-card flex-display">
        <span className="display-card-name">{value.name}</span>
        <span className="display-card-actions display-flex-right">
          <Edit
            className="action-items"
            onClick={() => {
              handleUpdate(value.id);
            }}
          ></Edit>
          {!isDetails && (
            <Delete
              onClick={() => {
                handleDelete(value.id);
              }}
            ></Delete>
          )}
          {isDetails && (
            <RemoveCircleOutlineIcon
              onClick={() => {
                handleRemove(value.id);
              }}
            />
          )}
          <ExpandMoreIcon
            onClick={() => {
              handleView(value.id);
            }}
          ></ExpandMoreIcon>
        </span>
      </Card>
    </>
  );
}

export default DisplayCard;
