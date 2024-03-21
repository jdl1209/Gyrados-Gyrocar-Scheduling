import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Help } from '@mui/icons-material';

export const mechanicListItems = (
  <React.Fragment>
    <ListItemButton href='/mechanic/account'>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
    <ListItemButton href='/mechanic/locatecar'>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="Locate a Car" />
    </ListItemButton>
    <ListItemButton href='/mechanic/reports'>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton href='/mechanic/monitoring'>
      <ListItemIcon>
        <Help />
      </ListItemIcon>
      <ListItemText primary="Monitoring" />
    </ListItemButton>
    <ListItemButton href='/mechanic/cars'>
      <ListItemIcon>
        <Help />
      </ListItemIcon>
      <ListItemText primary="Cars" />
    </ListItemButton>
  </React.Fragment>
);