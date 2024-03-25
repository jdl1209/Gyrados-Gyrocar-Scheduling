// //needed for maps
// 'use client'

// import * as React from "react";
// import { useEffect } from "react";
// import { Map, Marker, Overlay} from "pigeon-maps"
// import { osm } from 'pigeon-maps/providers'
// import { Metadata } from 'next'
// import { useState } from "react";
// import { CarRental } from "@mui/icons-material";


// // set page metadata
// /* 
// * doesn't work, causing errors
// * will need to find another way to do this
// export const metadata: Metadata = {
//     title: 'Map',
//   }
// */



// export default function MapPage() {
//     //default map props
    
    
//     const [center, setCenter] = useState([50.879, 4.6997])
//     const [zoom, setZoom] = useState(11)

//     return (
//       <React.Fragment>
//         <h1>
//             Map Page
//         </h1>
//         <h4>
//             This is a placeholder
//         </h4>
//         <Map 
//             height={500}
//             center={[50.879, 4.6997]} 
//             zoom={zoom} 
//             onBoundsChanged={({ center, zoom }) => { 
//                 //setCenter(center) 
//                 setZoom(zoom) 
//             }} 
//         >
//             {/* marker example 1 */}
//             <Marker 
//                 width={50}
//                 anchor={[50.890, 4.71]} 
//                 //color={red} 
//                 //onClick={() => setHue(hue + 20)} 
//             />
//             {/* marker example 2 */}
//             <Marker 
//                 width={50}
//                 anchor={[50.879, 4.6997]} 
//                 //color={color} 
//                 //onClick={() => setHue(hue + 20)} 
//             >
//                 <CarRental />
//             </Marker>
//             {/* marker example 3 - overlay */}
//             {/* you can use this to add any react element you want */}
//             {/* in theory examples 2 and 3 are anchored to the same point. Note how the way they scale is strange. Will have to figure that out */}
//             <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
//                 <img src='https://pigeon-maps.js.org/img/pigeon.jpg' width={30} height={30} alt='' />
//             </Overlay>
//         </Map>
//       </React.Fragment>
//     );
//   }

// //needed for maps
// 'use client'

// import * as React from "react";
// import { useEffect } from "react";
// import { Map, Marker, Overlay} from "pigeon-maps"
// import { osm } from 'pigeon-maps/providers'
// import { Metadata } from 'next'
// import { useState } from "react";
// import { CarRental } from "@mui/icons-material";


// // set page metadata
// /* 
// * doesn't work, causing errors
// * will need to find another way to do this
// export const metadata: Metadata = {
//     title: 'Map',
//   }
// */



// export default function MapPage() {
//     //default map props
    
    
//     const [center, setCenter] = useState([50.879, 4.6997])
//     const [zoom, setZoom] = useState(11)

//     return (
//       <React.Fragment>
//         <h1>
//             Map Page
//         </h1>
//         <h4>
//             This is a placeholder
//         </h4>
//         <Map 
//             height={500}
//             center={[50.879, 4.6997]} 
//             zoom={zoom} 
//             onBoundsChanged={({ center, zoom }) => { 
//                 //setCenter(center) 
//                 setZoom(zoom) 
//             }} 
//         >
//             {/* marker example 1 */}
//             <Marker 
//                 width={50}
//                 anchor={[50.890, 4.71]} 
//                 //color={red} 
//                 onClick={() => setHue(hue + 20)} 
//             />
//             {/* marker example 2 */}
//             {/* <Marker 
//                 width={50}
//                 anchor={[50.879, 4.6997]} 
//                 //color={color} 
//                 //onClick={() => setHue(hue + 20)} 
//             >
//                 <CarRental />
//             </Marker> */}
//             {/* marker example 3 - overlay */}
//             {/* you can use this to add any react element you want */}
//             {/* in theory examples 2 and 3 are anchored to the same point. Note how the way they scale is strange. Will have to figure that out */}
//             {/* <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
//                 <img src='https://pigeon-maps.js.org/img/pigeon.jpg' width={30} height={30} alt='' />
//             </Overlay> */}
//         </Map>
//       </React.Fragment>
//     );
//   }

// needed for maps
'use client'

import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps"
//import { Metadata } from 'next'
import axios from 'axios';

// set page metadata
// export const metadata: Metadata = {
//     title: 'Map',
// }

const MapPage = () => {
    const [devices, setDevices] = useState([]);
    const [positions, setPositions] = useState([]);
    const [center, setCenter] = useState([43.137726, -77.64232]);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'RjBEAiBdIdHoUcbQmwqHtQGFH9Th4SRyiVTb1lu446q2maSYMgIgViqHSudIAoGreLQiAmmw9ccFb-ChyHpa2lZRzJSFnoh7InUiOjEsImUiOiIyMDI0LTA1LTMwVDA0OjAwOjAwLjAwMCswMDowMCJ9';

                const devicesResponse = await axios.get('http://23.20.214.210:8082/api/devices',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('Response data:', devicesResponse.data); // Log response data

                const positionsResponse = await axios.get('http://23.20.214.210:8082/api/positions',{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('Response data:', positionsResponse.data); // Log response data
                setDevices(devicesResponse.data);
                setPositions(positionsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
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
        position: positions[index] // Access position information based on index
    }));
   
    return (
      <React.Fragment>
        <Map
          height={"110vh"}
          center={center}
          zoom={zoom}
          metaWheelZoom={true} //causes hydration error
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
              color="#33adad"
    
            />
          ))}
          <Marker
            //width={50}
            anchor={[43.20663, -77.68602]}
            color="#000180"
            >
            <div style={{ backgroundColor: "white", padding: "px", borderRadius: "5px", fontSize: "12px" }}>{'GyroGoGo Northwest'}</div>
            </Marker>
          <Marker
            //width={50}
            anchor={[43.21223, -77.45218]}
            color="#000180"
          >
            <div style={{ backgroundColor: "white", padding: "1px", borderRadius: "5px", fontSize: "12px" }}>{'GyroGoGo Northeast'}</div>
            </Marker>
          <Marker
            //width={50}
            anchor={[43.15752, -77.61197]}
            color="#000180"
            >
            <div style={{ backgroundColor: "white", padding: "1px", borderRadius: "5px", fontSize: "12px" }}>{'GyroGoGo Center City'}</div>
            </Marker>
          <Marker
            //width={50}
            anchor={[43.06997, -77.44159]}
            color="#000180"
            >
            <div style={{ backgroundColor: "white", padding: "1px", borderRadius: "5px", fontSize: "12px" }}>{'GyroGoGo Southeast'}</div>
            </Marker>
          <Marker
            //width={5}
            anchor={[43.10884, -77.67537]}
            color="#000180"
            >
            <div style={{ backgroundColor: "white", padding: "1px", borderRadius: "5px" , fontSize: "12px"}}>{'GyroGoGo Airport'}</div>
            </Marker>
        </Map>
      </React.Fragment>
    );
};

export default MapPage;

