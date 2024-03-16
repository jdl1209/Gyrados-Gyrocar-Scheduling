// //this is needed because some mui functions expecet "client" things like being able to use hooks.
// 'use client'

// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import NextLink from 'next/link';
// import Copyright from '@/components/Dashboard Components/Copyright';
// import ResponsiveAppBar from '@/components/ResponseiveAppBar';

// export default function Contact() {
//   return (
//     <React.Fragment>
//       <ResponsiveAppBar></ResponsiveAppBar>
//       <Box
//         sx={{
//           my: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
//           This is the Contact Page!!
//         </Typography>
//         <Copyright />
//       </Box>
//     </React.Fragment>
//   );
// }
"use client";
import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import logo from "./logo.png"; // Import your logo image
import ResponsiveAppBar from "@/components/ResponseiveAppBar";

const ContactUs: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });
  };

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} /> */}
            <Box
              component="img"
              sx={{
                // height: "200px",
                height: "90%",
                width: "90%",
                //maxHeight: { xs: 233, md: 267 },
                //maxWidth: { xs: 350, md: 450 },
                alignItems: "left",
                display: "inline-flex",
                ml: "7%",
                mt: "2%",
                mb: "2%",
                position: "relative",
              }}
              alt="Logo"
              src="/assets/images/GyroGoGo Logo blue on clear for light background 440px.png"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ maxWidth: { sm: "90%", md: "75%" } }}
            >
              Our Customer Service staff will be happy to answer any questions
              you may have.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ maxWidth: { sm: "90%", md: "75%" } }}
            >
              Please use the form below to reach us.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
