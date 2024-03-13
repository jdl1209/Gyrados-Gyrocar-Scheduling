import * as React from "react";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import Image from "mui-image";

export default function ProductHero() {
  return (
    <AppBar position="static">
      <Paper
        sx={{
          bgcolor: "#34adad",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          sx={{
            width: { sm: "100%", md: "87%" },
            height: { sm: "100%", md: "78%" },
            textAlign: { sm: "left", md: "left" },
            fontWeight: "medium",
          }}
        >
          GyroGoGo
        </Typography>
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "87%" },
            height: { sm: "100%", md: "78%" },
            textAlign: { sm: "left", md: "left" },
          }}
        >
          It’s easy.
          <br /> It’s convenient.
          <br /> It’s cost effective.
          <br />
          <Typography
            variant="h4"
            sx={{
              textAlign: { sm: "left", md: "left" },
              fontStyle: "italic",
              fontWeight: "medium",
            }}
          >
            GyroGoGo!
          </Typography>
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Car"
          src="car clear background.png"
        />
        <img src="car clear background.png" />
      </Paper>
    </AppBar>
  );
}
