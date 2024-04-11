import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import {pageLinks} from './ResponsiveAppBar';
import {settings} from './ResponsiveAppBar';

// Define the props interface
interface UserButtonProps {
    userPicture?: string; // Optional user picture prop
}


//set up local versions of needed variables
//var _pageLinks = pageLinks as unknown as Map<string, string>
//var _settings = settings as unknown as Array<string>
//NOTE - this is no longer needed because aparently things like this work if you import {settings} instead of settings

export default function UserButton({userPicture}: UserButtonProps) {
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

    return (
        <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/*TODO - add in something which actually gets the user's name for the alt. This is important for accessibility.*/}
                  <Avatar alt="User" src={userPicture} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    //TODO - Examine this
                    // The following function makes it move to a page if a page exists for that and if not it doesn't try, which would result in an error page not found
                    onClick={() =>
                      // This is a gross way to handle this but we can fix it later if we want
                      {
                        if (pageLinks.get(setting) === undefined) {
                          handleCloseUserMenu();
                        } else {
                          window.location.href = pageLinks.get(setting) as string;
                        }
                      }
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
    )
}