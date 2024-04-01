//
"use client"

import React from "react";

import { Metadata } from 'next'
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { Autocomplete, Box, FormControl, TextField, Button, Stack, Typography} from "@mui/material";
import { useState } from "react";
import { object } from "prop-types";
import dayjs, { Dayjs } from 'dayjs';



var now = dayjs()


// set page metadata
//TODO Find another way to do this
/*
export const metadata: Metadata = {
    title: 'Book a Trip',
}
*/

//this is setting up the options for the location selection
//TODO make this a dynamic function which pulls info from the database
//TODO decide if the filter goes location first then availible times and dates, or times and dates then availible locations. Right now I'm leaning towards the latter
const options = ['GyroGoGo Northwest', 'GyroGoGo Northeast', 'GyroGoGo Center City', 'GyroGoGo Southeast', 'GyroGoGo Airport'];


type pickupLocationProps = {
  label: string,
  name: string,
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

type Values = {
  pickupTime: object,
  dropoffTime: object,
  pickupLocation: string,
  dropoffLocation: string

}


export default function BookingPage() {
  //set up values for form
  const [pickupTime, setPickupTime] = React.useState<Dayjs | null>(dayjs().add(1, 'hour'));
  const [dropoffTime, setDropoffTime] = React.useState<Dayjs | null>(dayjs().add(2, 'hour'));
  const [pickupLocation, setPickupLocation] = React.useState<string | null>(options[0]);
  const [dropoffLocation, setDropoffLocation] = React.useState<string | null>(options[0]);

  function getPickupTime() {
    if (pickupTime !== null && pickupTime !== undefined) {
      return pickupTime;
    }
    return null;
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    //define object to return
    const myData: {pickupTime: Dayjs | null, dropoffTime: Dayjs | null, pickupLocation: string | null, dropoffLocation: string | null, userID: string | null} = {
      pickupTime: pickupTime,
      dropoffTime: dropoffTime,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      //TODO @Eric fix this plz
      userID: "dummyID"
    }
    event.preventDefault();
    //return form data
    //TODO make this actually submit a request to the server or something, because right now it just logs to console
    console.log(myData)
  }
  

  /*
  const [pickupTime, setPickupTime] = React.useState("");
  const [dropoffTime, setDropoffTime] = React.useState("");

  const handlePickupTime = (event) => {
    setPickupTime(event.target.value);
  };


  //form submission function
  //TODO make this work
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form Submitted");
  }
  */

    return (
      <Box padding={2.5}>
        <Typography variant="h4" gutterBottom>
          Booking Page
        </Typography>
        {/* TODO implement error checking/form validation */}
        {/* TODO could maybe grey out/make unavailible dates/times which are not availible in the system */}
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Stack spacing={2}>
            <DateTimePicker
              label="Pickup Time"
              disablePast
              value={pickupTime}
              onChange={setPickupTime}
              renderInput={(params) => <TextField {...params} />}
              //TODO Implement error message
            />
            <DateTimePicker
              label="Dropoff Time"
              disablePast
              value={dropoffTime}
              minDateTime={dayjs(pickupTime).add(15, "minutes")}
              onChange={setDropoffTime}
              renderInput={(params) => <TextField {...params} />}
              //TODO Implement error message
            />
            <Autocomplete
              id="pickup-location"
              options={options}
              value={pickupLocation}
              onChange={(event, newValue) => setPickupLocation(newValue)}
              renderInput={(params) => <TextField {...params} label="Pickup Location" />}
            />
            <Autocomplete
              id="dropoff-location"
              options={options}
              value={dropoffLocation}
              onChange={(event, newValue) => setDropoffLocation(newValue)}
              renderInput={(params) => <TextField {...params} label="Dropoff Location" />}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </FormControl>
      </form>
      </Box>
    );
  }
  