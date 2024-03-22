//this is needed because some mui functions expecet "client" things like being able to use hooks.
"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import Copyright from "@/components/Dashboard Components/Copyright";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // Leaving the border here for now because I want to use it to shrink the sizing later.
  //border: '1px solid',
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(5),
  borderRadius: "4px",
  textAlign: "center",
}));

export default function Contact() {
  return (
    <React.Fragment>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Contact Us
        </Typography>

        <Item>
          <Typography
            component="h6"
            variant="subtitle1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Our customer service staff will be happy to answer any questions you
            may have. Please use the form below to reach us.
          </Typography>
        </Item>

        <Grid container spacing={2}>
          <Grid container item xs={6} direction="column">
            <Item>
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  textAlign: "center",
                }}
              >
                <Box
                  component="form"
                  // This needs to be worked on later when we have submissions ready.
                  // onSubmit={SubmitEvent}
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
                      Name
                    </Typography>
                    <TextField
                      required
                      id="nameField"
                      label="Name"
                      variant="filled"
                    />
                    <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
                      Email
                    </Typography>
                    <TextField
                      required
                      id="emailField"
                      label="Email"
                      variant="filled"
                    />
                    <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
                      Message
                    </Typography>
                    <TextField
                      id="messageField"
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Type your message here!"
                      variant="filled"
                    />
                  </div>
                  <Button
                    type="submit"
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#34adad",
                    }}
                    variant="contained"
                    sx={{
                      width: { xs: "50%", sm: "60%", md: "40%" },
                      textAlign: { xs: "center", sm: "center", md: "center" },
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Typography>
            </Item>
          </Grid>

          <Grid container item xs={5} direction="column">
            <Item>
              <Typography
                component="h5"
                variant="h5"
                sx={{
                  textAlign: "center",
                }}
              >
                Our regular office hours are{" "}
                <strong>Monday - Friday, 8:00 AM - 8:00 PM ET.</strong>
              </Typography>
            </Item>

            <Item>
              <Typography
                component="h5"
                variant="h5"
                sx={{
                  textAlign: "center",
                }}
              >
                Members will receive a 24-hour emergency service number in their
                rental confirmation.
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}
