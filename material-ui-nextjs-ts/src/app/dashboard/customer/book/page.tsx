// needed for maps
"use client";

import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import {
  Autocomplete,
  Box,
  FormControl,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { object } from "prop-types";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

var now = dayjs();

// set page metadata
//TODO Find another way to do this
/*
export const metadata: Metadata = {
    title: 'Book a Trip',
}
*/

const options = [
  "GyroGoGo Northwest",
  "GyroGoGo Northeast",
  "GyroGoGo Center City",
  "GyroGoGo Southeast",
  "GyroGoGo Airport",
];

//this is setting up the options for the location selection
//TODO make this a dynamic function which pulls info from the database
//TODO decide if the filter goes location first then availible times and dates, or times and dates then availible locations. Right now I'm leaning towards the latter
type pickupLocationProps = {
  label: string;
  name: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type Values = {
  pickupTime: object;
  dropoffTime: object;
  pickupLocation: string;
  dropoffLocation: string;
};

export default function BookingPage() {
  //set up values for form
  const [pickupTime, setPickupTime] = React.useState<Dayjs | null>(
    dayjs().add(1, "hour")
  );
  const [dropoffTime, setDropoffTime] = React.useState<Dayjs | null>(
    dayjs().add(2, "hour")
  );
  const [pickupLocation, setPickupLocation] = React.useState<string | null>(
    options[0]
  );
  const [dropoffLocation, setDropoffLocation] = React.useState<string | null>(
    options[0]
  );

  //map
  const [devices, setDevices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [center, setCenter] = useState([
    43.108859786505946, -77.55088614659995,
  ]);
  const [zoom, setZoom] = useState(10.8);
  //const [pickupTime, setSelectedPickupLocation] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "RjBEAiBdIdHoUcbQmwqHtQGFH9Th4SRyiVTb1lu446q2maSYMgIgViqHSudIAoGreLQiAmmw9ccFb-ChyHpa2lZRzJSFnoh7InUiOjEsImUiOiIyMDI0LTA1LTMwVDA0OjAwOjAwLjAwMCswMDowMCJ9";
        const devicesResponse = await axios.get(
          "http://23.20.214.210:8082/api/devices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const positionsResponse = await axios.get(
          "http://23.20.214.210:8082/api/positions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDevices(devicesResponse.data);
        setPositions(positionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const combinedData = devices.map((device, index) => ({
    id: device.id,
    name: device.name,
    latitude: positions[index] ? positions[index].latitude : null,
    longitude: positions[index] ? positions[index].longitude : null,
    position: positions[index],
  }));

  function getPickupTime() {
    if (pickupTime !== null && pickupTime !== undefined) {
      return pickupTime;
    }
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //define object to return
    const myData: {
      pickupTime: Dayjs | null;
      dropoffTime: Dayjs | null;
      pickupLocation: string | null;
      dropoffLocation: string | null;
      userID: string | null;
    } = {
      pickupTime: pickupTime,
      dropoffTime: dropoffTime,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      //TODO @Eric fix this plz
      userID: "dummyID",
    };
    event.preventDefault();
    //TODO make this actually submit a request to the server or something, because right now it just logs to console
    console.log(myData);
  };

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

  // Function to get the coordinates of a location
  const getLocationCoordinates = (location: string): [number, number] => {
    switch (location) {
      case "GyroGoGo Northwest":
        return [43.20663, -77.68602];
      case "GyroGoGo Northeast":
        return [43.21223, -77.45218];
      case "GyroGoGo Center City":
        return [43.15752, -77.61197];
      case "GyroGoGo Southeast":
        return [43.06997, -77.44159];
      case "GyroGoGo Airport":
        return [43.10884, -77.67537];
      default:
        return [0, 0]; // Default coordinates, change as needed
    }
  };

  // Function to handle marker click and update the selected marker ID
  // const handleMarkerClick = (id: string) => {
  // setSelectedMarkerId(id);
  // };

  return (
    <div style={{ display: "flex" }}>
      <Box padding={2.5} style={{ flex: 1 }}>
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
                sx={{ paddingBottom: 2 }}
                //TODO Implement error message
              />
              {/* <Box paddingTop={.5}> */}
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
                renderInput={(params) => (
                  <TextField {...params} label="Pickup Location" />
                )}
              />
              <Autocomplete
                id="dropoff-location"
                options={options}
                value={dropoffLocation}
                onChange={(event, newValue) => setDropoffLocation(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Dropoff Location" />
                )}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
      <Box style={{ flex: 1 }}>
        <Map
          height={"100vh"}
          center={center}
          zoom={zoom}
          metaWheelZoom={true}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
        >
          <ZoomControl />
          {combinedData.map(({ id, name, latitude, longitude, position }) => (
            <Marker
              key={id}
              anchor={[latitude, longitude]}
              onClick={() => console.log("Clicked on device:", name)}
              color={'#33adad'}
            />
          ))}

          {/* Map through the options array to generate markers */}
          {options.map((location, index) => (
            <Marker
              key={index}
              anchor={getLocationCoordinates(location)}
            >
              <div
                style={{
                  backgroundColor: pickupLocation === location ? "#33adad" : "white", // Highlight background color if pickupLocation matches the current location
                  padding: "1px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                {location}
              </div>
            </Marker>
          ))}
        </Map>
      </Box>
    </div>
  );
}

