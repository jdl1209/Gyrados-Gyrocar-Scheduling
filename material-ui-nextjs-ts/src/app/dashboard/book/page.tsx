import React from "react";

import { Metadata } from 'next'

// set page metadata
export const metadata: Metadata = {
    title: 'Book a Trip',
  }

export default function BookingPage() {
    return (
      <React.Fragment>
        <h1>
            Booking Page
        </h1>
        <h4>
            This is a placeholder
        </h4>
      </React.Fragment>
    );
  }