'use client';
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



export default function GetAllUsers({data}: {data:any}) {
    console.log("HELLO THERE");
    console.log(data);

    const initialRows = data.map((item: any) => ({
        name: item.fName,
        email: item.email,
        numb: item.phoneNum, // Assuming `phone` field corresponds to `numb`
        stat: item.activated, // Assuming `status` field corresponds to `stat`
      }));
    
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
          setRows((prevRows:any) => {
            const updatedRows = [...prevRows];
            updatedRows[rowIndex].stat = "Active";
            return updatedRows;
          });
          break;
        case "Inactive":
          setRows((prevRows:any) => {
            const updatedRows = [...prevRows];
            updatedRows[rowIndex].stat = "Inactive";
            return updatedRows;
          });
          break;
        case "Delete":
          setRows((prevRows:any) => {
            const updatedRows = prevRows.filter((_:any, index:any) => index !== rowIndex);
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
        <h1>Users Database</h1>
        <TableComponent
          columns={columns}
          rows={rows.map((row: { stat: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; }, rowIndex: number) => ({
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