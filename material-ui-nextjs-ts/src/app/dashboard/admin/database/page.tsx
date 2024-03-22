//date stuff requires use client
'use client'

import CollapsibleTable from "@/components/Dashboard Components/CollapsibleTable";
import React from "react";

export default function Database() {
    // this will show general database info

    //this will check if the person has permisions based on who they're logged in as
    //TODO implement check
    if (true) {
        return (
            <React.Fragment>
              <h1>
                  Database Page
              </h1>
              <h4>
                  List of Locations
              </h4>
              {/* TODO Make this actually input dynamic data */}
              <CollapsibleTable/>
            </React.Fragment>
          );
    } else {
        return (
            <div />
        )
    }
  }