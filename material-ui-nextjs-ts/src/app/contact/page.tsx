//this is needed because some mui functions expecet "client" things like being able to use hooks.
'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Copyright from '@/components/Dashboard Components/Copyright';
import ResponsiveAppBar from '@/components/ResponseiveAppBar';

export default function Contact() {
  return (
    <React.Fragment>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          This is the Contact Page!!
        </Typography>
        <Copyright />
      </Box>
    </React.Fragment>
  );
}