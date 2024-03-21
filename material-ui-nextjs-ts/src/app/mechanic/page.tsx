//this is needed because some mui functions expect "client" things like being able to use hooks.
'use client'

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import Copyright from "@/components/Dashboard Components/Copyright";

export default function MechanicPortal() {
  return (
    <Container>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Mechanic Portal Placeholder Page
      </Typography>
      <Copyright></Copyright>
    </Container>
  );
}
