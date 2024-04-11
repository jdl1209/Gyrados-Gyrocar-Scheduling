"use client"

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import UserButton from "./UserButton";

// Define the props interface
interface ResponsiveAppBarProps {
  isSignedIn: boolean;
  userPicture?: string; // Optional user picture prop
}

// Pages and page links
//export so they can be used in other files
//I hate everything about how this is set up but it's not worth it to change lol
export const pages = ["Home", "About Us", "FAQ", "Contact Us"];
export const pageLinks = new Map<string, string>([
  ["Home", "/"],
  ["About Us", "/#AboutUs"],
  ["FAQ", "/#FAQ"],
  ["Contact Us", "contact"],
  ["Dashboard", "dashboard"],
  ["Logout", "/api/auth/logout"],
  ["Profile", "dashboard/customer/account"]
]);

// Settings
export const settings = ["Profile", "Dashboard", "Logout"];

// Define the component
const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ isSignedIn, userPicture }) => {  console.log("isSignedIn:", isSignedIn); // Console log the value of isSignedIn

  // State hooks
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Event handlers
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Render
  return (
    <AppBar position="static" style={{ marginBottom: "0px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and name */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GyroGoGo
          </Typography>

          {/* Left side options */}
          {/* Small size */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Big size */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GyroGoGo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                key={page}
                href={pageLinks.get(page)}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right Side Button */}
          {/* Example of inline conditional rendering */}
          {isSignedIn ? (
            // True condition
            <UserButton />
          ) : (
            // False condition
            <Button
              key={"Sign-In/Sign-Up"}
              href={"/api/auth/login"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {"Sign-In/Sign-Up"}
            </Button>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
