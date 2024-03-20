import * as React from "react";
import { useEffect } from "react";
import { Map, Marker} from "pigeon-maps"
import { osm } from 'pigeon-maps/providers'
import { Metadata } from 'next'
import { useState } from "react";

// set page metadata
export const metadata: Metadata = {
    title: 'Map',
  }



export default function MapPage() {
    //default map props
    
    
    const [center, setCenter] = useState([86, 39.13]);
    const zoom = useState(15);

    useEffect(() => {
        setCenter([1010.99835602, 77.01502627]);
      }, [1010.99835602, 77.01502627]);

    return (
      <React.Fragment>
        <h1>
            Map Page
        </h1>
        <h4>
            This is a placeholder
        </h4>
        <div style={{ height: "90vh", width: "100%" }}>
            <Map center={center} zoom={zoom}>
                <Marker width={50} anchor={center} />
            </Map>
                {latitude} : {longitude}
        </div>
      </React.Fragment>
    );
  }