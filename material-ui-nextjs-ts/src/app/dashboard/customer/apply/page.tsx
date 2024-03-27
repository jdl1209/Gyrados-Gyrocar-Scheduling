// //this is needed because some mui functions expecet "client" things like being able to use hooks. In this case we need it for the theming
"use client";

import React from "react";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "@/components/Dashboard Components/Copyright";
import PasswordStrengthBar from "react-password-strength-bar";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';

interface IFormInput {
  name: string;
  address1: string;
  address2: string;
  phone: string;
  city: string;
  state: string;
  licenseNumber: string;
}

const Apply: React.FC = async () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  // const session = await getSession();
  // const isSignedIn = !!session && !!session.user; // Set isSignedIn based on session
  // if (!session || !session.user) {
  //   console.log("invalid session" + session?.user);
  // }

  // console.log(session.user.name);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await fetch("http://localhost:3000/api/register", { method: "POST", body: JSON.stringify(data)});
    if (!res.ok) { console.log(res.statusText) };
    const json = await res.json();
    
    console.log(json);
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                {/* TODO @Kevin can you fix up this page to remove things like the email and password since this is now accessed from the login */}
                
                {/* const { password } = this.state; */}
                {/* {password && (
      <Typography variant="caption" color={passwordStrength.score < 3 ? 'error' : 'inherit'}>
        Password strength: {passwordStrength.score} ({passwordStrength.feedback.warning})
      </Typography>
    )} */}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#000180",
                  }}
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

    </>
  );
};

export default Apply;
