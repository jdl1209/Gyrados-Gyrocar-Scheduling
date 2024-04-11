//date stuff requires use client
// 'use client'

import CollapsibleTable from "@/components/Dashboard Components/CollapsibleTable";

// import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

    // this will show general database info

    //this will check if the person has permisions based on who they're logged in as
    //TODO implement check
   

export default async function DatabasePage() {
  // const [employees, setEmployees] = useState([]);
  // const [cars, setCars] = useState([]);

  // const employees = await getAllEmployees();

  // console.log(employees);
  const cars = await getAllCars();
  // useEffect(() => {
  //   // Fetch Employees
  //   fetch('/api/employees')
  //     .then((res) => res.json())
  //     .then(setEmployees)
  //     .catch(console.error);

  //   // Fetch Cars
  //   fetch('/api/cars')
  //     .then((res) => res.json())
  //     .then(setCars)
  //     .catch(console.error);
  // }, []);

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
          {/* <TableBody>
            {employees.map((item: any, idx: any) => (
              <TableRow key={item.employeeID}>
                <TableCell>{item.employeeID}</TableCell>
                <TableCell>{item.roleID}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.fullname}</TableCell>
                <TableCell>{item.office}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
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
            {cars.map((item: any, idx: any) => (
              <TableRow key={item.carType}>
                <TableCell>{item.carType}</TableCell>
                <TableCell>{item.battery}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.reserved}</TableCell>
                <TableCell>{item.sublocationID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

// async function getAllEmployees() {
//   const res = await fetch('http://localhost:3000/api/employees');
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error(`Failed to fetch data ${res.statusText}`);
//   }
 
//   return res.json()
// }

async function getAllCars() {
  const res = await fetch('http://localhost:3000/api/cars');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data ${res.statusText}`);
  }
 
  return res.json()
}