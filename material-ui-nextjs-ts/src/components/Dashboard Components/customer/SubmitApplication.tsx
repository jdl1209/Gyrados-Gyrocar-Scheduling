"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import zxcvbn from "zxcvbn";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  Fade,
  Modal,
  Backdrop,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "@/components/Dashboard Components/Copyright";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
// import { Document, Page } from "react-pdf";
import PdfViewer from "@/app/services/pdfviewer";

interface IFormInput {
    name: string;
    address1: string;
    address2: string;
    phone: string;
    city: string;
    state: string;
    licenseNumber: string;
  }
  
export default function Apply({userID}: {userID:any}){
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  // console.log("This is the userID" + userID);

  // console.log(session.user.name);
  const [openModal, setOpenModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const pdfURL =
    "material-ui-nextjs-ts/public/assets/pdf/GyroGoGo Rental Terms and Conditions.pdf";
  const scribdUrl =
    "https://www.scribd.com/document/717995058/GyroGoGo-Rental-Terms-and-Conditions";

  // userID is used here as the initial value for the name field
  const [formData, setFormData] = useState<IFormInput>({ name: userID, address1: "", address2: "", phone: "", city: "", state: "", licenseNumber: "" });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("HELLO");

    if (termsAccepted) {
      console.log(data);
      fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            console.log(res.statusText);
          }
          return res.json;
        })
        .then((json) => {
          console.log(json);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setShowAlert(true); // Show the alert if the terms are not opened
    }
  };

  const handleTermsClick = () => {
    setOpenModal(true);
  };
  
  const handleModalClose = () => {
    setOpenModal(false);
  };
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
    setIsButtonDisabled(!event.target.checked); // Disable the button if terms are not accepted
  };

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/assets/images/car front view.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#34adad" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Application Form
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                style={{
                  borderRadius: 10,
                  color: "#000180",
                }}
                {...register("name")}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                {...register("address1")}
                margin="normal"
                required
                fullWidth
                id="address1"
                label="Address Line 1"
                autoComplete="address"
              />
              <TextField
                {...register("address2")}
                margin="normal"
                fullWidth
                id="address2"
                label="Address Line 2"
                autoComplete="address"
              />
              <TextField
                {...register("phone")}
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                autoComplete="phone"
              />
              <TextField
                {...register("city")}
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                autoComplete="city"
              />
              <TextField
                {...register("state")}
                margin="normal"
                required
                fullWidth
                id="state"
                label="State"
                autoComplete="state"
              />
              <TextField
                {...register("licenseNumber")}
                margin="normal"
                required
                fullWidth
                id="licenseNumber"
                label="Driver's License ID"
                autoComplete="licenseNumber"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    // {...register("remember")}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link href="#" onClick={handleTermsClick} variant="body2">
                Terms and Conditions
              </Link>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: 10,
                  backgroundColor: "#000180",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#0001a7" },
                }}
                onClick={handleFormSubmit} // Handle form submission
                disabled={isButtonDisabled}
              >
                Apply
              </Button>

              <Grid container>
                {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                {/* <Grid item>
                    <Link href="#" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid> */}
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Modal for terms and conditions */}
      <Modal
        open={openModal}
        aria-labelledby="terms-modal-title"
        aria-describedby="terms-modal-description"
        closeAfterTransition
        //BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 10,
              boxShadow: 24,
              padding: 4,
              maxWidth: 600,
              margin: "auto",
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // Align items horizontally (center align)
            }}
          >
            <Typography
              id="terms-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Terms and Conditions
            </Typography>
            {/* PDF iframe */}
            <PdfViewer scribdUrl={scribdUrl} />
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="Accept"
              sx={{ alignSelf: "center" }}
            />

            <Button onClick={handleModalClose} sx={{ marginTop: "auto" }} >Close</Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
