import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/">
      Gyrogogo, Inc.
      </MuiLink>{' '}
      {new Date().getFullYear()}.
      is a privately owned, United States based corporation that provides commuting solutions for individuals. 
    </Typography>
  );
}
