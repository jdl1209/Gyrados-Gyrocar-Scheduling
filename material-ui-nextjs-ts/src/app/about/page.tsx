//this is needed because some mui functions expecet "client" things like being able to use hooks.
'use client'

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import ProTip from '@/components/Dashboard Components/ProTip';
import Copyright from '@/components/Dashboard Components/Copyright';
import ResponsiveAppBar from '@/components/ResponseiveAppBar';

export default function About() {
  return (
    <Container disableGutters>
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
          Material UI - Next.js example in TypeScript
        </Typography>
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={NextLink} href="/">
            Go to the home page
          </Button>
        </Box>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}