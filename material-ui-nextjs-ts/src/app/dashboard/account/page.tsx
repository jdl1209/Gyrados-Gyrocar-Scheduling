import React from "react";

import { Metadata } from 'next'

// set page metadata
export const metadata: Metadata = {
    title: 'My Account',
  }

export default function AccountPage() {
    return (
      <React.Fragment>
        <h1>
            Account Page
        </h1>
        <h4>
            This is a placeholder
        </h4>
      </React.Fragment>
    );
  }