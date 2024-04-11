import React from "react";
import { Metadata } from 'next'

// set page metadata
export const metadata: Metadata = {
    title: 'My Trips',
  }

export default function TripsPage() {
    return (
      <React.Fragment>
        <h1>
            Trips Page
        </h1>
        <h4>
            This is a placeholder
        </h4>
      </React.Fragment>
    );
  }