// needed for maps
"use client";

import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import axios from "axios";
import { Box } from "@mui/material";
//import { Metadata } from 'next'

// set page metadata
// export const metadata: Metadata = {
//     title: 'Map',
// }

const options = [
  "GyroGoGo Northwest",
  "GyroGoGo Northeast",
  "GyroGoGo Center City",
  "GyroGoGo Southeast",
  "GyroGoGo Airport",
];

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


const LocateCar = () => {
  // this will show a way to locate a car in the system
  const [devices, setDevices] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [center, setCenter] = useState<[number, number]>([43.17183227492212, -77.55702962983183]);
  const [zoom, setZoom] = useState(11);

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
        console.log("Response data:", devicesResponse.data); // Log response data

        const positionsResponse = await axios.get(
          "http://23.20.214.210:8082/api/positions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response data:", positionsResponse.data); // Log response data
        setDevices(devicesResponse.data);
        setPositions(positionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Combine devices and positions into an array of objects containing both device and position information
  const combinedData = devices.map((device, index) => ({
    id: device.id,
    name: device.name,
    latitude: positions[index] ? positions[index].latitude : null,
    longitude: positions[index] ? positions[index].longitude : null,
    position: positions[index], // Access position information based on index
  }));

  //this will check if the person has permisions based on who they're logged in as
  //TODO implement check
  if (true) {
    return (
      <React.Fragment>
        {/* <h1>
                  Locate Car Page
              </h1>
              <h4>
                  This is a placeholder
              </h4> */}
        <h1 style={{ textAlign: "center" }}>Car Locator Map</h1>
        <Box style={{ flex: 1, height: "100vh" }}>
        <Map
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
                  backgroundColor: "white",
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
      </React.Fragment>
    );
  } else {
    return <div />;
  }
};
export default LocateCar;
