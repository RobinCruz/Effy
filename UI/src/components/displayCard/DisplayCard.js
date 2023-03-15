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
      <Card className="display-card flex-display">
        <span className="display-card-name">{value.name}</span>
        <div className="display-flex-right">
          {Object.keys(value).length > 2 ?
          <span className={value.active > 0 ? 'active' : 'inactive'}>
            {
              value.active > 0 ? "Active" : "Inactive" 
            }
          </span> : null
          }
          <span className="display-card-actions">
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
        </div>
      </Card>
    </>
  );
}

export default DisplayCard;
