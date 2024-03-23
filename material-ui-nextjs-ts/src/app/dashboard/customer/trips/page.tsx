import React from "react";

import { Metadata } from 'next'
import BasicTable from "@/components/Dashboard Components/BasicTable";

// set page metadata
export const metadata: Metadata = {
    title: 'Book a Trip',
  }

export default function Trips() {
    return (
      <React.Fragment>
        <h1>
            My Trips Page
        </h1>
        <h4>
            My Trips
        </h4>
        {/* TODO Make this actually input dynamic data */}
        <BasicTable/>
      </React.Fragment>
    );
  }