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
          // height: "50vh",
          height: "auto",
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
            // height: "200px",
            height: "20%",
            width: "350px",
            maxHeight: { xs: 233, md: 267 },
            maxWidth: { xs: 350, md: 450 },
            alignItems: "left",
            display: "inline-flex",
            ml: "7%",
            mt: "2%",
            mb: "2%",
            position: "relative"
          }}
          alt="Logo"
          src="/assets/images/GyroGoGo Logo blue on clear for light background 440px.png"
        />
        <Typography
          variant="h4"
          sx={{
            //width: { sm: "50%", md: "21.3%" },
            //height: { sm: "50%", md: "98%" },
            textAlign: { sm: "left", md: "left" },
            alignItems: "left",
            display: "inline-flex",
            ml: "7%",
            // mt: "2%",
            // mb: "2%",
            position: "relative"
          }}
        >
          It's easy.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            //width: { sm: "50%", md: "27%" },
            //height: { sm: "50%", md: "50%" },
            textAlign: { sm: "left", md: "left" },
            //maxHeight: { xs: 233, md: 267 },
            //maxWidth: { xs: 350, md: 450 },
            alignItems: "left",
            display: "inline-flex",
            ml: "7%",
            // mt: "2%",
            // mb: "2%",
            position: "relative"
          }}
        >
          It's convenient.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "29.4%" },
            height: { sm: "100%", md: "98%" },
            textAlign: { sm: "left", md: "left" },
            alignItems: "left",
            display: "inline-flex",
            ml: "7%",
            position: "relative"
          }}
        >
          It's cost effective.
        </Typography>
        <Typography
          variant="h4"
          sx={{
            width: { sm: "100%", md: "23.2%" },
            height: { sm: "100%", md: "100%" },
            textAlign: { sm: "left", md: "left" },
            fontStyle: "italic",
            fontWeight: "medium",
            color: "white",
            alignItems: "left",
            display: "inline-flex",
            ml: "7%",
            mt: "2%",
            mb: "2%",
            position: "relative"
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
            width: { xs: "40%",sm: "30%", md: "20%" },
            textAlign: { xs: "center", sm: "center", md: "center" },
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
            marginRight: {xs: "30%" },
            marginLeft: { md: "65%"},
            marginTop: {md: "-6%"}
            //ml: "75%",
            //mr: "3em",
            //mt: "-6%",
          }}
          alt="Car"
          src="/assets/images/car clear background.png"
        />
      </Paper>
    </AppBar>
  );
}
