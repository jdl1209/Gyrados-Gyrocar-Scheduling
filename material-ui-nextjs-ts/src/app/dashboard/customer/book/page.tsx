//
"use client"

import React from "react";

import { Metadata } from 'next'
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { Autocomplete, Box, FormControl } from "@mui/material";
import TextField from "@mui/material";

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
const options = [
  { label: 'Location One', id: 1 },
  { label: 'Location Two', id: 2 },
  { label: 'Location Three', id: 3 },
  { label: 'Location Four', id: 4 },
];

export default function BookingPage() {
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
        <FormControl>
          Pickup Time <br/>
          <DateTimePicker/>
          {/* TODO implement error message */}
          <br/> <br/>
          Dropoff Time <br/>
          <DateTimePicker/>
          {/* TODO implement error message */}
          <br/><br/>
          {/* TODO fix this
          <Autocomplete
            id="PickupLocation"
            options={options}
            renderInput={(params) => <TextField {...params} label="Pickup Location" />}
          >
          </Autocomplete>
          */}

          
        </FormControl>
      </Box>
    );
  }