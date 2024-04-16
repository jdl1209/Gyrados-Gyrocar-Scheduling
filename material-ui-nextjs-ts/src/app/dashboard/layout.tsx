import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  mainListItems,
  customerServiceListItems,
  mechanicListItems,
} from "@/components/Dashboard Components/listItems";
import { useTheme } from "@mui/material/styles";
import DashboardNav from "@/components/DashboardNav";
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { DB } from "@/lib/db";


//main page content
export default async function DashboardLayout(props: { children: React.ReactNode }) {
  //set up session stuff
  const session = await getSession();
  const db = new DB;
  if (!session || !session.user) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">Invalid session</Typography>
      </Box>
    );
  }
  //set up variables for user roles
  //default to false
  //there's probably a more elegant way to do this but whatever lol
  var isAdmin = false;
  var isCustomer = false;
  var isCustomerService = false;
  var isMechanic = false;
  //wait to get user role
  try {
    // Await the resolution of the Promise returned by db.getUserRole
    const role = await db.getUserRole(session.user.sub);
    console.log(role)

    //assign values to isRole variables
    switch(role){
      //customer
      case 1: {
        isCustomer = true;
        break;
      }
      //customer service
      case 2: {
        isCustomerService = true;
        break;
      }
      //mechanic
      case 3: {
        isMechanic = true;
        break;
      }
      //manager
      case 4: {
        //nothing here yet, are we still using this role?
        //TODO - if we're not, we should remove it
        //right now I am letting it fall through to the admin cases
      }
      //Business Administrator
      case 5: {
        //letting this fall through to the sysadmin case, since we don't have separate defined functions on our end for the schema of this project
      }
      //Systems Administrator
      case 6: {
        isAdmin = true;
        break;
      }

    }
  } catch (error) {
    console.error("Error fetching user role:", error);
  }

  
  


  //main content
  //TODO - make this actually call on the database. feel free to reference page.tsx
  return (
    <DashboardNav
      children={props.children}
      isAdmin={isAdmin}
      isCustomer={isCustomer}
      isCustomerService={isCustomerService}
      isMechanic={isMechanic}
    />
  );
}
