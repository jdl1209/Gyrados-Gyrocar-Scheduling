'use client'
import TableComponent from "@/components/TableComponent";
import React, { useState, useEffect } from "react";
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Height } from "@mui/icons-material";

const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "E-Mail", minWidth: 170 },
    { id: "numb", label: "Phone", minWidth: 170 },
    { id: "stat", label: "Status", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 120 },
];

const initialRows = [
    {name: "Albert Flores", email: "flores61@gmail.com", numb: "+1 (211)234-5678", stat: "Inactive"},
    {name: "Maria Rodriguez", email: "mrodriguez@gmail.com", numb: "+1 (222)345-6789", stat: "Active"},
    {name: "John Smith", email: "jsmith@gmail.com", numb: "+1 (233)456-7890", stat: "Active"},
    {name: "Emily Johnson", email: "ejohnson@gmail.com", numb: "+1 (244)567-8901", stat: "Inactive"},
    {name: "Michael Brown", email: "mbrown@gmail.com", numb: "+1 (255)678-9012", stat: "Active"},
    {name: "Jennifer Martinez", email: "jmartinez@gmail.com", numb: "+1 (266)789-0123", stat: "Inactive"},
    {name: "David Wilson", email: "dwilson@gmail.com", numb: "+1 (277)890-1234", stat: "Active"},
    {name: "Jessica Taylor", email: "jtaylor@gmail.com", numb: "+1 (288)901-2345", stat: "Active"},
    {name: "Daniel Anderson", email: "danderson@gmail.com", numb: "+1 (299)012-3456", stat: "Inactive"},
    {name: "Sarah Thomas", email: "sthomas@gmail.com", numb: "+1 (200)123-4567", stat: "Active"},
    {name: "Christopher Lee", email: "clee@gmail.com", numb: "+1 (211)234-5678", stat: "Inactive"},
    {name: "Amanda Harris", email: "aharris@gmail.com", numb: "+1 (222)345-6789", stat: "Active"},
    {name: "Matthew Clark", email: "mclark@gmail.com", numb: "+1 (233)456-7890", stat: "Active"},
    {name: "Samantha Lewis", email: "slewis@gmail.com", numb: "+1 (244)567-8901", stat: "Inactive"}
];

export default function Applications() {
  // State to track the selected action for each row
  const [selectedActions, setSelectedActions] = useState<{
    [key: number]: string;
  }>({});
  const [rows, setRows] = useState(initialRows);

  // Function to handle action change
  const handleActionChange = (
    event: SelectChangeEvent<string>,
    rowIndex: number
  ) => {
    const { value } = event.target;
    setSelectedActions((prevActions) => ({
      ...prevActions,
      [rowIndex]: value,
    }));
  };

  // Apply action to the row when selected action changes
  useEffect(() => {
    for (const rowIndexStr in selectedActions) {
      const rowIndex = parseInt(rowIndexStr);
      const action = selectedActions[rowIndex];
      if (action) {
        applyAction(rowIndex, action);
      }
    }
  }, [selectedActions]);

  // Function to apply the selected action to the row
  const applyAction = (rowIndex: number, action: string) => {
    switch (action) {
      case "Active":
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[rowIndex].stat = "Active";
          return updatedRows;
        });
        break;
      case "Inactive":
        setRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[rowIndex].stat = "Inactive";
          return updatedRows;
        });
        break;
      case "Delete":
        setRows((prevRows) => {
          const updatedRows = prevRows.filter((_, index) => index !== rowIndex);
          return updatedRows;
        });
        break;
      default:
        break;
    }
    // Clear selected action after applying
    setSelectedActions((prevActions) => {
      const updatedActions = { ...prevActions };
      delete updatedActions[rowIndex];
      return updatedActions;
    });
  };

  return (
    <React.Fragment>
      <h1>Application Approvals</h1>
      <TableComponent
        columns={columns}
        rows={rows.map((row, rowIndex) => ({
          ...row,
          stat: (
            <Chip
              label={row.stat}
              style={{
                backgroundColor: row.stat === "Active" ? "#18AB56" : "#EB5757",
                color: "white",
              }}
            />
          ),
          action: (
            <Select
              value={selectedActions[rowIndex] || ""}
              onChange={(event) => handleActionChange(event, rowIndex)}
              sx={{ width: "150px" }}
            >
              <MenuItem value="">-</MenuItem>
              <MenuItem value="Active">Activate</MenuItem>
              <MenuItem value="Inactive">Deactivate</MenuItem>
              <MenuItem value="Delete">Delete</MenuItem>
            </Select>
          ),
        }))}
      />
    </React.Fragment>
  );
}