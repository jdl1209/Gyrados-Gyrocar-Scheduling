//TODO - remove the admin toggle from this page

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
  adminListItems,
  customerServiceListItems,
  mechanicListItems,
} from "@/components/Dashboard Components/listItems";
import { useTheme } from "@mui/material/styles";
import DashboardNav from "@/components/DashboardNav";

//main page content
export default function DashboardLayout(props: { children: React.ReactNode }) {


  //main content
  return (
    <DashboardNav
      children={props.children}
    />
  );
}
