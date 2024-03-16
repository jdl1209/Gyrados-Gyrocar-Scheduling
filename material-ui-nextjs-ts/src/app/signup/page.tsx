// //this is needed because some mui functions expecet "client" things like being able to use hooks. In this case we need it for the theming
'use client'

// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ResponsiveAppBar from '@/components/ResponseiveAppBar';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// export default function SignUp() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     //TODO: remove this themeprovider? It should already be provided by layout
//     //Also idk what purpose the component="main" container has
//     <Container disableGutters> 
//       <ResponsiveAppBar></ResponsiveAppBar>
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="First Name"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="/signin" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     <Copyright sx={{ mt: 5 }} />
//     </Container>
//   );
// }

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
import ResponsiveAppBar from "@/components/ResponseiveAppBar";

interface IFormInput {
  name: string;
  address1: string;
  address2: string;
  password: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  licenseNumber: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const password = watch("password");
  const passwordStrength = password ? zxcvbn(password) : { score: 0 };

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <ThemeProvider theme={createTheme()}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
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
                <TextField
                  {...register("email")}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoComplete="email"
                />
                <TextField
                  {...register("password")}
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
                {/* const { password } = this.state; */}
                <PasswordStrengthBar password={password} />
                {/* {password && (
      <Typography variant="caption" color={passwordStrength.score < 3 ? 'error' : 'inherit'}>
        Password strength: {passwordStrength.score} ({passwordStrength.feedback.warning})
      </Typography>
    )} */}
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("remember")}
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
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SignUp;