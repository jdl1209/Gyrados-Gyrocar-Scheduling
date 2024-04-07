//date stuff requires use client
'use client'

import CollapsibleTable from "@/components/Dashboard Components/CollapsibleTable";

import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

    // this will show general database info

    //this will check if the person has permisions based on who they're logged in as
    //TODO implement check
   

export default function DatabasePage() {
  const [employees, setEmployees] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch Employees
    fetch('/api/employees')
      .then((res) => res.json())
      .then(setEmployees)
      .catch(console.error);

    // Fetch Cars
    fetch('/api/cars')
      .then((res) => res.json())
      .then(setCars)
      .catch(console.error);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Database Overview</Typography>

      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom>Employees</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Role ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Office</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((row) => (
              <TableRow key={row.employeeID}>
                <TableCell>{row.employeeID}</TableCell>
                <TableCell>{row.roleID}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.office}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom>Cars</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Car Type</TableCell>
              <TableCell>Battery</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reserved</TableCell>
              <TableCell>Sublocation ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.carType}>
                <TableCell>{car.carType}</TableCell>
                <TableCell>{car.battery}</TableCell>
                <TableCell>{car.status}</TableCell>
                <TableCell>{car.reserved}</TableCell>
                <TableCell>{car.sublocationID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
