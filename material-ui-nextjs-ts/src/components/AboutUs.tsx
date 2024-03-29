import * as React from "react";
import Typography from "@mui/material/Typography";

export default function AboutUs() {
  return (
    <>
      <Typography
        component="h1"
        variant="h1"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        About&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            color: "#34adad",
          }}
        >
          Us
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ maxWidth: { sm: "100%", md: "65%" } }}
      >
        We invite you to join us in using GyroGoGo for easy, convenient personal
        transportation. Rent a gyrocar for a single run into downtown, or rent
        it for the day to visit multiple destinations. The cars are designed to
        carry a single passenger and a small amount of cargo.
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ maxWidth: { sm: "100%", md: "65%" } }}
      >
        Gyrocars are easy to drive because internal gyroscopes balance the cars
        for you. You don’t need any special training to drive a gyrocar, just
        slide in and go! These cars have a small profile, so are easy to
        navigate through traffic – and parking is a breeze. County regulations
        even allow gyrocars to be parked in designated motorcycle slots.
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ maxWidth: { sm: "100%", md: "65%" } }}
      >
        We have five convenient pick up/drop off locations in Monroe County,
        including in center city. Your rental is operated with a unique access
        code that prevents anyone else from entering your vehicle. If you’ve
        opted for a longer rental, our gyrocars can be recharged at any EV
        charging station.
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ maxWidth: { sm: "100%", md: "65%" } }}
      >
        If you need more information, check out the Q&A section or send us a
        message through our Contact Page.
      </Typography>
      <Typography variant="h4">
        It’s easy. It’s convenient. It’s cost effective.
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: { sm: "left", md: "center" },
          fontStyle: "italic",
          fontWeight: "medium",
          color: "#34adad",
        }}
      >
        GyroGoGo!
      </Typography>
    </>
  );
}
