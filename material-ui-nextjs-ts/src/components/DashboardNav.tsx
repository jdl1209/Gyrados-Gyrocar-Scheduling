//this is needed because some mui functions expecet "client" things
"use client";


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
3;
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
  employeeListItems,
  customerServiceListItems,
  mechanicListItems,
} from "@/components/Dashboard Components/listItems";
import { useTheme } from "@mui/material/styles";

//dashboard layout
import { Switch } from "@mui/material";

//set up copyright
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        GyroGoGo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//set up drawer/nav
const drawerWidth: number = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

//main page content
export default function DashboardNav(props: 
  { children: React.ReactNode, isAdmin: boolean, isCustomerService: boolean, isMechanic: boolean, isCustomer: boolean}
) {

  //set some things up
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //set up reference for theme color
  function themeToUse() {
    if (props.isAdmin || props.isCustomerService || props.isMechanic) {
      return "employee";
    } else {
      return "primary";
    }
  }

 

  //main content
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Box sx={{ display: "flex" }}>
        {/* this gives an error but I have no idea why because it works perfectly ¯\_(ツ)_/¯ */}
        <AppBar position="absolute" open={open} color={themeToUse()}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              User Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider>{props.isAdmin ? "Customer Items" : ""}</Divider>
          <List component="nav">
            {props.isCustomer ||props.isAdmin ?
            <React.Fragment>
              {mainListItems}
            </React.Fragment>
            : ""
            }
            {/*NOTE - I am using inline conditional rendering to render each series of components based on boolean logic */}
            {props.isAdmin ? (
              <React.Fragment>
                {employeeListItems}
              </React.Fragment>
            ) : (
              ""
            )}
            {/*NOTE - Right now I have things set up so the "admin" role also confers the ability to view all other sections*/}
            {props.isAdmin || props.isCustomerService ? (
              <React.Fragment>
                {customerServiceListItems}
              </React.Fragment>
            ) : (
              ""
            )}
            {props.isAdmin || props.isMechanic ? (
              <React.Fragment>
                {mechanicListItems}
              </React.Fragment>
            ) : (
              ""
            )}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </section>
  );
}
