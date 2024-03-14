import * as React from "react";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
//import Image from "mui-image";

export default function ProductHero() {
  return (
    <AppBar position="static">
      <Paper
        sx={{
          bgcolor: "#34adad",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          //justifyContent: "center",
          //alignItems: "left",
        }}
      >
        {/* <Typography
          component="h2"
          variant="h1"
          sx={{
            width: { sm: "100%", md: "39%" },
            height: { sm: "100%", md: "98%" },
            textAlign: { sm: "center", md: "center" },
            fontWeight: "medium",
          }}
        >
          GyroGoGo
        </Typography> */}
        <Box
          component="img"
          sx={{
            height: "233px",
            width: "350px",
            maxHeight: { xs: 233, md: 267 },
            maxWidth: { xs: 350, md: 450 },
            alignItems: "left",
            display: "inline-flex",
            ml: "7%",
            mt: "2%",
            mb: "2%"
          }}
          alt="Logo"
          src="/assets/images/GyroGoGo Logo blue on clear for light background 440px.png"
        />
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "21.3%" },
            height: { sm: "100%", md: "98%" },
            textAlign: { sm: "center", md: "center" },
          }}
        >
          It’s easy.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "27%" },
            height: { sm: "100%", md: "100%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          It’s convenient.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "29.4%" },
            height: { sm: "100%", md: "98%" },
            textAlign: { sm: "center", md: "center" },
          }}
        >
          It’s cost effective.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "23.2%" },
            height: { sm: "100%", md: "100%" },
            textAlign: { sm: "left", md: "center" },
            fontStyle: "italic",
            fontWeight: "medium",
            color: "white",
          }}
        >
          GyroGoGo!
        </Typography>
        <Button
          style={{
            borderRadius: 10,
            backgroundColor: "#000180",
            padding: "18px 36px",
            fontSize: "18px",
          }}
          variant="contained"
          sx={{
            width: { sm: "100%", md: "15%" },
            textAlign: { sm: "left", md: "center" },
            display: "inline-flex",
            ml: "7%",
            mt: "2%",
          }}
        >
          Apply now
        </Button>
        <Box
          component="img"
          sx={{
            height: "233px",
            width: "350px",
            maxHeight: { xs: 233, md: 267 },
            maxWidth: { xs: 350, md: 450 },
            alignItems: "right",
            display: "inline-flex",
            ml: "75%",
            mt: "-6%",
          }}
          alt="Car"
          src="/assets/images/car clear background.png"
        />
      </Paper>
    </AppBar>
  );
}
