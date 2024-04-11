import CustomerTrips from "@/components/Dashboard Components/CustomerTrips";
import TableComponent from "@/components/TableComponent";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

// import { Metadata } from 'next'

// // set page metadata
// export const metadata: Metadata = {
//     title: 'Book a Trip',
//   }


export default async function Trips() {

  const data = await getData();
  // const columns = Object.keys(data[0]).map(key => ({
  //   id: key,
  //   label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key
  //   minWidth: 170
  // }));

  // const rows = data.map(item => {
  //   const row = {};
  //   columns.forEach(column => {
  //     row[column.id] = item[column.id];
  //   });
  //   return row;
  // });

  // console.log(columns);
  // console.log(rows);
  
  // const columns = Object.keys(data[0]).map(key => ({
  //   id: key,
  //   label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter of the key
  //   minWidth: 170
  // }));
  
  // const rows = data.map((item: { carID: any; dateCreated: string | number | Date; timeBegin: string | number | Date; timeEnd: string | number | Date; }) => ({
  //   car: item.carID,
  //   date: new Date(item.dateCreated).toLocaleDateString(),
  //   time: new Date(item.timeBegin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' + new Date(item.timeEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  // }));
  
  // console.log("HELLO" + columns);
  // console.log(rows);

  return (
    <CustomerTrips data={data}/>
  );
}

async function getData() {
  const res = await fetch('http://localhost:3000/api/reservations');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data ${res.statusText}`);
  }
 
  return res.json()
}

