import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Collapse,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const columns = [
  { id: "", label: "", maxWidth: 10 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "submittedDate", label: "Application submitted on", minWidth: 170 },
  { id: "stat", label: "Status", minWidth: 170 },
];

const ApplicationsTable = ({ rows, applyAction }) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const toggleRowExpansion = (rowIndex) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowIndex)
        ? prevExpandedRows.filter((row) => row !== rowIndex)
        : [...prevExpandedRows, rowIndex]
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer
        sx={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRowExpansion(rowIndex)}
                      >
                        {expandedRows.includes(rowIndex) ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.submittedDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.stat}
                        style={{
                          backgroundColor:
                            row.stat === "Active" ? "#18AB56" : "#EB5757",
                          color: "white",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={4}
                    >
                      <Collapse
                        in={expandedRows.includes(rowIndex)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>
                              <strong>Email:</strong> {row.email}
                            </span>
                            <span>
                              <strong>Phone:</strong> {row.numb}
                            </span>
                            <br />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>
                              <strong>Address 1:</strong> {row.address1}
                            </span>
                            {row.address2 && (
                              <>
                                <span>
                                  <strong>Address 2:</strong> {row.address2}
                                </span>
                                <br />
                              </>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>
                              <strong>City:</strong> {row.city}
                            </span>
                            <span>
                              <strong>State:</strong> {row.state}
                            </span>
                            <span>
                              <strong>License ID:</strong> {row.licenseID}
                            </span>
                            <br />
                          </div>
                        </div>
                        {/* Button to set status to Active */}
                        {row.stat !== "Active" && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "10px",
                            }}
                          >
                            <button
                              onClick={() => applyAction(rowIndex, "Active")}
                              style={{
                                backgroundColor: "#18AB56",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                padding: "8px 16px",
                                cursor: "pointer",
                              }}
                            >
                              Activate
                            </button>
                          </div>
                        )}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ApplicationsTable;
