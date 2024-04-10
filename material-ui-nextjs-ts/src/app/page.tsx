//this is needed because some mui functions expecet "client" things like being able to use hooks.
//"use client";
//commented out because aysnc/await is not supported in client components

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Copyright from "@/components/Dashboard Components/Copyright";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import FAQ from "@/components/FAQ";
import GyroHero from "@/components/GyroHero";
import Testimonials from "@/components/Testimonials";
import AboutUs from "@/components/AboutUs";
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {

  const session = await getSession();
  const isSignedIn = !!session && !!session.user; // Set isSignedIn based on session
  if (!session || !session.user) {
    console.log("invalid session");
  }

  // const user = session.user;
  // console.log(user.picture);

  return (
    
    <React.Fragment>
      <ResponsiveAppBar isSignedIn={isSignedIn}></ResponsiveAppBar>
      <GyroHero />
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div id="Testimonials" />
        <h1>{session?.user.name}</h1>
        <Testimonials />
        <div id="AboutUs" />
        <AboutUs />
        <div id="FAQ" />
        <FAQ />
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
