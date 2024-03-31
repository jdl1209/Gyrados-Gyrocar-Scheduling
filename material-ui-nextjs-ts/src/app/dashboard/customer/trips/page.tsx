"use client";
import TableComponent from "@/components/TableComponent";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

// import { Metadata } from 'next'

// // set page metadata
// export const metadata: Metadata = {
//     title: 'Book a Trip',
//   }

const columns = [
  { id: "car", label: "Car", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "time", label: "Time", minWidth: 170 },
];

const rows = [
  { car: "Gyro #545", date: "07/07/2023", time: "03:00:04 PM" },
  { car: "Gyro #619", date: "06/01/2023", time: "01:23:07 PM" },
  { car: "Gyro #732", date: "05/15/2023", time: "10:45:12 AM" },
  { car: "Gyro #821", date: "04/22/2023", time: "08:10:35 AM" },
  { car: "Gyro #905", date: "03/30/2023", time: "05:55:48 PM" },
  { car: "Gyro #103", date: "02/12/2023", time: "12:30:21 PM" },
  { car: "Gyro #115", date: "01/05/2023", time: "09:14:33 AM" },
  { car: "Gyro #226", date: "12/17/2022", time: "06:40:59 PM" },
  { car: "Gyro #332", date: "11/20/2022", time: "04:25:42 PM" },
  { car: "Gyro #417", date: "10/08/2022", time: "02:08:56 PM" },
  { car: "Gyro #514", date: "09/14/2022", time: "11:11:11 AM" },
  { car: "Gyro #603", date: "08/19/2022", time: "07:45:27 AM" },
  { car: "Gyro #720", date: "07/25/2022", time: "03:20:39 PM" },
  { car: "Gyro #811", date: "06/29/2022", time: "01:01:01 PM" },
  { car: "Gyro #922", date: "05/08/2022", time: "10:10:10 AM" },
];

const upcoming = [
  { car: "Gyro #420", date: "04/20/2024", time: "04:20:69 PM" },
];

export default function Trips() {
  return (
    <React.Fragment>
      <h1>My Trips Page</h1>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Upcoming Trips
          </Typography>
          {upcoming.length === 0 ? (
            <Typography variant="body2">
              You have no upcoming trips scheduled.
            </Typography>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {upcoming.map((trip, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <Typography variant="h5" style={{ marginRight: "20px" }}>
                    {trip.car}
                  </Typography>
                  <Typography variant="h6" style={{ marginRight: "20px" }}>
                    {trip.date}
                  </Typography>
                  <Typography variant="h6">{trip.time}</Typography>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <h4>Past Trips</h4>
      <TableComponent columns={columns} rows={rows} />
    </React.Fragment>
  );
}
