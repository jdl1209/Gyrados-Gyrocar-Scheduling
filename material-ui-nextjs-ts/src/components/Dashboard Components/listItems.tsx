import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Explore, Help, MonitorHeart, HistoryEdu, Email, People, DataObject} from '@mui/icons-material';
import { List, ListItem, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href='/dashboard/account'>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
    <ListItemButton href='/dashboard/trips'>
      <ListItemIcon>
        <CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="My Trips" />
    </ListItemButton>
    <ListItemButton href='/dashboard/book'>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="New Trip" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Help />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItemButton>
  </React.Fragment>
);

//TODO: try to find a way to pin these to the bottom maybe?
export const secondaryListItems = (
  <React.Fragment>
    <Divider sx={{backgroundColor: "#DEDEDE"}}>
      Admin Items
    </Divider>
    {/* not using anymore, left it in in case we want to reference what I was doing
    <ListSubheader component="div">
      <Typography variant='h6' color={"admin.main"} align='center'>
        Admin Items
      </Typography>
    </ListSubheader>
    */}
    <ListItemButton>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Database" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MonitorHeart />
      </ListItemIcon>
      <ListItemText primary="Monitoring" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Log" />
    </ListItemButton>

    <Divider sx={{backgroundColor: "#DEDEDE"}}>
      Customer Service Items
    </Divider>
    <ListItemButton>
      <ListItemIcon>
        <Email />
      </ListItemIcon>
      <ListItemText primary="Customer Service" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <HistoryEdu />
      </ListItemIcon>
      <ListItemText primary="Applications" />
    </ListItemButton>

    <Divider sx={{backgroundColor: "#DEDEDE"}}>
      Mechanic Items
    </Divider>
    <ListItemButton>
      <ListItemIcon>
        <Explore />
      </ListItemIcon>
      <ListItemText primary="Locate A Car" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SummarizeIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    

  </React.Fragment>
);
