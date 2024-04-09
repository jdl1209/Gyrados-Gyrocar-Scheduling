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

//main page content
export default async function DashboardLayout(props: { children: React.ReactNode }) {
  //set up session stuff
  const session = await getSession();
  if (!session || !session.user) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">Invalid session</Typography>
      </Box>
    );
  }
  const user = session.user;
  const userRoles: string[] = session.user.roles || [];
  console.log(session.user)


  //main content
  return (
    <DashboardNav
      children={props.children}
      isAdmin={true}
      isCustomer={false}
      isCustomerService={true}
      isMechanic={true}
    />
  );
}
