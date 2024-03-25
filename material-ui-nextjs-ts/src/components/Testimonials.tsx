'use client'

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: "Remy Sharp",
    title: "Smooth and Fun Experience!",
    testimonial:
      "Renting a gyrocar through this app was such a breeze! The entire process, from booking to drop-off, was seamless. The gyrocar itself was a blast to drive, and navigating through the city streets was a breeze. Highly recommended for anyone looking for a unique and enjoyable transportation experience!",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: "Travis Howard",
    title: "Convenient and Reliable Service!",
    testimonial:
      "I needed a quick and convenient way to get around town, and this gyrocar renting app delivered! The app interface is user-friendly, making it easy to book a gyrocar on the go. The gyrocar was clean, well-maintained, and a joy to ride. Plus, the customer service team was responsive and helpful. Will definitely be using this service again!",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: "Cindy Baker",
    title: "Perfect for Exploring the City!",
    testimonial:
      "I had a fantastic experience renting a gyrocar through this app during my visit to the city. It was the perfect way to explore all the sights and sounds without having to worry about parking or getting stuck in traffic. The gyrocar was easy to operate, and the rental process was hassle-free. Can't wait to use this app again on my next adventure!",
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
    name: "Julia Stewart",
    title: "Great Alternative to Traditional Rental Cars!",
    testimonial:
      "As someone who prefers eco-friendly transportation options, renting a gyrocar through this app was a no-brainer. Not only was it environmentally friendly, but it was also a lot of fun to drive! The app made the rental process simple and straightforward, and the gyrocar exceeded my expectations. I'll definitely be choosing gyrocar rentals over traditional cars from now on!",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
    name: "John Smith",
    title: "Efficient and Cost-Effective!",
    testimonial:
      "I needed a cost-effective way to get around town for a few days, and this gyrocar renting app was the perfect solution. The rental rates were competitive, and the gyrocar was surprisingly fuel-efficient. Plus, the app's pickup and drop-off locations were conveniently located near public transportation hubs. Overall, a great experience that I would highly recommend to others!",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
    name: "Daniel Wolf",
    title: "User-Friendly and Safe!",
    testimonial:
      "Renting a gyrocar through this app was a fantastic experience! While the gyrocar accommodates only a single passenger, I thoroughly enjoyed the unique riding experience it provided. Safety was definitely a top priority, and I appreciated the app's thorough inspection process and safety features. I'll definitely be using this app again for my future adventures!",
  },
];

const whiteLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  //TODO - @Kevin a lot of this looks like it can be removed to clean things up. If that's the case can you do it at some point. Low priority. If not you can just ignore this todo or remove it.
  //NOTE - I removed these because the theme should be inherited from the parent app component anyway
  //const theme = useTheme();
  //const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="#34adad">
          Testimonials
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See what our customers love about our cars. Discover how we excel in
          efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliablity.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.title}
                />
                {/* <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                /> */}
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
