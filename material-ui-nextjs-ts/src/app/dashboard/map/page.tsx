//needed for maps
'use client'

import * as React from "react";
import { useEffect } from "react";
import { Map, Marker, Overlay} from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'
import { Metadata } from 'next'
import { useState } from "react";
import { CarRental } from "@mui/icons-material";


// set page metadata
/* 
* doesn't work, causing errors
* will need to find another way to do this
export const metadata: Metadata = {
    title: 'Map',
  }
*/



export default function MapPage() {
    //default map props
    
    
    const [center, setCenter] = useState([50.879, 4.6997])
    const [zoom, setZoom] = useState(11)

    return (
      <React.Fragment>
        <h1>
            Map Page
        </h1>
        <h4>
            This is a placeholder
        </h4>
        <Map 
            height={500}
            center={[50.879, 4.6997]} 
            zoom={zoom} 
            onBoundsChanged={({ center, zoom }) => { 
                //setCenter(center) 
                setZoom(zoom) 
            }} 
        >
            {/* marker example 1 */}
            <Marker 
                width={50}
                anchor={[50.890, 4.71]} 
                //color={red} 
                //onClick={() => setHue(hue + 20)} 
            />
            {/* marker example 2 */}
            <Marker 
                width={50}
                anchor={[50.879, 4.6997]} 
                //color={color} 
                //onClick={() => setHue(hue + 20)} 
            >
                <CarRental />
            </Marker>
            {/* marker example 3 - overlay */}
            {/* you can use this to add any react element you want */}
            {/* in theory examples 2 and 3 are anchored to the same point. Note how the way they scale is strange. Will have to figure that out */}
            <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
                <img src='https://pigeon-maps.js.org/img/pigeon.jpg' width={30} height={30} alt='' />
            </Overlay>
        </Map>
      </React.Fragment>
    );
  }