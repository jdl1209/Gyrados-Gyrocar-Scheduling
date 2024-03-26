//
"use client"

import React from "react";

import { Metadata } from 'next'
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { Autocomplete, Box, FormControl, TextField, Button, Stack} from "@mui/material";
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
        <h1>
            Booking Page
        </h1>
        <h4>
            This is a placeholder
        </h4>
        {/* TODO implement error checking/form validation */}
        {/* TODO could maybe grey out/make unavailible dates/times which are not availible in the system */}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack spacing={1} direction="column">
              <Box>
                Pickup Time <br/>
                <DateTimePicker
                disablePast={true}
                value={pickupTime}
                onChange={(newValue) => setPickupTime(newValue)}
                /> 
                {/* TODO implement error message */}
              </Box>
              <Box>
                Dropoff Time <br/>
                <DateTimePicker
                disablePast={true}
                value={dropoffTime}
                minDateTime={getPickupTime()!.add(15, "minutes")}
                onChange={(newValue) => setDropoffTime(newValue)}
                />
                {/* TODO implement error message */}
              </Box>
              <Box>
              Pickup Location <br/>
                <Autocomplete
                  id="PickupLocation"
                  options={options}
                  onChange={(event: any, newValue: string | null) => {
                    setPickupLocation(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Pickup Location" />}
                >
                </Autocomplete>
              </Box>
              <Box>
                Dropoff Location <br/>
                <Autocomplete
                  id="DropoffLocation"
                  options={options}
                  onChange={(event: any, newValue: string | null) => {
                    setDropoffLocation(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} label="Dropoff Location" />}
                >
                </Autocomplete>
              </Box>

              <Button 
              variant="contained"
              type="submit"
              >
                Submit
              </Button>


            </Stack>
          </FormControl>
        </form>
      </Box>
    );
  }