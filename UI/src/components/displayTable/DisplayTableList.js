import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import React, { useState } from "react";
import EnhancedTableHead from "./EnhancedTableHead";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Delete, Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import "./displayTable.css";

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const userHeadCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];
const compHeadCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function DisplayTableList({
  listValue,
  handleUpdate,
  handleDelete,
  handleView,
  handleRemove,
  isDetails,
  selectType,
  handleCreate,
}) {
  const [filterValue, setFilterValue] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [listValuePerPage, setlistValuePerPage] = React.useState(5);

  const handleChangeFilter = (e) => {
    setFilterValue(e.target.value);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = listValue.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangelistValuePerPage = (event) => {
    setlistValuePerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty listValue.
  const emptylistValue =
    page > 0
      ? Math.max(0, (1 + page) * listValuePerPage - listValue.length)
      : 0;
  return (
    <div>
      <div className="flex-display">
        <TextField
          id="filter-text-felid"
          label="Search by Name"
          variant="standard"
          value={filterValue}
          className="display-list-filter"
          onChange={handleChangeFilter}
          StyledTableCell={StyledTableCell}
        />
        {!isDetails && (
          <Button
            variant="contained"
            className="display-flex-right create-button"
            onClick={() => {
              handleCreate();
            }}
          >
            {Object.keys(listValue[0]).length > 2
              ? "Create New User"
              : "Create new Company"}
          </Button>
        )}
      </div>
      {listValue[0].name != undefined && (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={listValue.length}
                StyledTableCell={StyledTableCell}
                headCells={
                  Object.keys(listValue[0]).length > 2
                    ? userHeadCells
                    : compHeadCells
                }
              />
              <TableBody>
                {stableSort(listValue, getComparator(order, orderBy))
                  .filter((e) =>
                    e.name.toLowerCase().includes(filterValue.toLowerCase())
                  )
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <StyledTableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <StyledTableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="1"
                        >
                          {row.name}
                        </StyledTableCell>
                        {Object.keys(row).length > 2 && (
                          <StyledTableCell align="right" padding="1">
                            <span
                              className={
                                row.active === 1 ? "active" : "inactive"
                              }
                            >
                              {row.active === 1 ? "Active" : "Inactive"}
                            </span>
                          </StyledTableCell>
                        )}
                        <StyledTableCell align="right" padding="1">
                          <a>
                            <Edit
                              className="action-items"
                              onClick={() => {
                                handleUpdate(row.id);
                              }}
                            ></Edit>
                          </a>
                          {!isDetails && (
                            <Delete
                              onClick={() => {
                                handleDelete(row.id);
                              }}
                            ></Delete>
                          )}
                          {isDetails && (
                            <RemoveCircleOutlineIcon
                              onClick={() => {
                                handleRemove(row.id);
                              }}
                            />
                          )}
                          <ExpandMoreIcon
                            onClick={() => {
                              handleView(row.id);
                            }}
                          ></ExpandMoreIcon>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                {emptylistValue > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}

export default DisplayTableList;
