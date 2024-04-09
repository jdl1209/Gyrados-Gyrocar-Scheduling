"use client";
// Import necessary modules
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
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, customerServiceListItems, mechanicListItems } from "@/components/Dashboard Components/listItems";
import { Switch } from "@mui/material";

// Define the width of the drawer
const drawerWidth: number = 240;

// Define interface for AppBarProps
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Styled AppBar component
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

// Styled Drawer component
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

// Main DashboardLayout component
export default function DashboardLayout({
  children, // will be a page or nested layout
  role = [], // Default to empty array if role is not provided
}: {
  children: React.ReactNode;
  role?: string[]; // Make role prop optional
}) {
  // State to manage the drawer open/close
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // State to manage user role
  const [isEmployee, setIsEmployee] = React.useState(true); // Default to employee

  // Function to toggle user role between admin and customer
  const toggleUserRole = () => {
    setIsEmployee(!isEmployee);
  };

  // Determine if the user is a customer based on the role
  const isCustomer: boolean = role && role.includes("customer");

  // Main content
  return (
    <section>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open} color={isCustomer ? "primary" : "employee"}>
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
            {/* Switch component to toggle between employee and customer roles */}
            <Switch
              checked={isEmployee}
              onChange={toggleUserRole}
              color="default"
            />
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
          <Divider>{isEmployee ? "Employee Items" : ""}</Divider>
          <List component="nav">
            {/* Render different lists based on the user role */}
            {isEmployee || role.includes("customer") ? (
              <React.Fragment>{mainListItems}</React.Fragment>
            ) : (
              ""
            )}
            {isEmployee || role.includes("customer_service") ? (
              <React.Fragment>{customerServiceListItems}</React.Fragment>
            ) : (
              ""
            )}
            {isEmployee || role.includes("mechanic") ? (
              <React.Fragment>{mechanicListItems}</React.Fragment>
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
          {children}
        </Box>
      </Box>
    </section>
  );
}
