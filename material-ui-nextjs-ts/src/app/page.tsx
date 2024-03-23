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
        {/* leave this bit in for now I think? Not sure what to do with it */}
        <Container>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            LEAVING AS PLACEHOLDER TO REMIND MYSELF TO ADD IMAGES TO CLEAN UP THE HOMEPAGE
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
          >
            Text that can be used with optional photos on Home or About page:
            Arrive at your destination in comfort and looking professional regardless of the weather.
            Navigate city traffic with ease. Parking is a breeze.
            Five convenient locations for pick up and drop off!
            Gyrocars are authorized to park in designated motorcycle spaces.
            Save money! Renting an environmentally friendly gyrocar as needed is far more cost effective than commuting in an automobile that you own and maintain.
            The bus and the subway just aren’t going to work. Light deliveries are a piece of cake with GyroGoGo!
            When the bus line is a mile away, enjoy door to door transportation to your destination.
            Yes, jogging or biking to work may be healthy, but how do you look (and smell!) on arrival?
            Do you really want to risk your high end auto in traffic like this?
          </Typography>
        </Container>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
