// export default ApplicationsTable;
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

interface Row {
  name: string;
  submittedDate: string;
  stat: string;
  email: string;
  numb: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  licenseID: string;
}

interface Column {
  id: string;
  label: string;
  minWidth: number;
}

const columns: Column[] = [
  { id: "", label: "", minWidth: 10 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "submittedDate", label: "Application submitted on", minWidth: 170 },
  { id: "stat", label: "Status", minWidth: 170 },
];

interface ApplicationsTableProps {
  rows: Row[];
  applyAction: (rowIndex: number, action: string) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  rows,
  applyAction,
}) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const toggleRowExpansion = (rowIndex: number) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowIndex)
        ? prevExpandedRows.filter((row) => row !== rowIndex)
        : [...prevExpandedRows, rowIndex]
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
