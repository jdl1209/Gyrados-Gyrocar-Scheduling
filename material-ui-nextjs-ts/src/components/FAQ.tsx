import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
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
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              What do I need to sign up for GyroGoGo?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              All you need to do is provide some basic information on yourself
              plus your driver’s license information and a valid credit card.
              You will receive your approval within 24-72 hours.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              You declined my application for membership. What can I do about
              this?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              When your application was declined, you were provided a reason for
              the decision. You need to rectify this problem. Most commonly this
              is because either a license or a credit card has expired. If you
              provide us with current credentials, we are happy to move your
              membership forward.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              What is the process for renting a gyrocar?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Your first step is to apply for a membership in GyroGoGo on this
              website. You will have access to our rental functions as soon as
              your information has been verified. The step-by-step reservation
              process is clear and easy to use; just select your desired pick up
              and drop off locations and start/return dates and times. You’ll
              receive a confirmation email with pick up instructions and the
              necessary access code for your vehicle.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Do I need a special kind of license to drive a gyrocar?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              No. A current, regular driver’s license is all that is required to
              legally drive a gyrocar.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5d-content"
            id="panel5d-header"
          >
            <Typography component="h3" variant="subtitle2">
              I have never ridden a motorcycle. How will I be able to safely
              drive a gyrocar?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              A gyrocar uses a gyroscope for balance, so you do not need to
              learn the kind of skills required for riding a motorcycle. Driving
              a gyrocar is much like driving your automobile, just more slender
              and more nimble.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6d-content"
            id="panel6d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How far in advance can I make reservations for a GyroGoGo car?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Reservations are allowed up to one month in advance.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7d-content"
            id="panel7d-header"
          >
            <Typography component="h3" variant="subtitle2">
              I regularly commute to the county courthouse. Can I make
              reservations for several trips at the same time?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Yes, a member may have more than one reservation booked at a time.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel8d-content"
            id="panel8d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Do I have to return the gyrocar to the same location I picked it
              up from?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              No, you are not required to return the vehicle to the same
              location. During the rental process you will be asked the return
              destination.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel9"}
          onChange={handleChange("panel9")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel9d-content"
            id="panel9d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Is there any limit to the distance from the pick up site I can
              drive the gyrocar?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Yes, our vehicles are geo-fenced to operate no more than 20 miles
              outside Monroe County. The car will shut off if you exceed this
              perimeter.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel10"}
          onChange={handleChange("panel10")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel10d-content"
            id="panel10d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Is there a limit to the number of hours or days I can rent the
              gyrocar?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              You can rent a GyroGoGo car for the time duration that meets you
              needs up to one month. If you wish to reserve the car for longer,
              you will need to make sequential reservations.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel11"}
          onChange={handleChange("panel11")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel11d-content"
            id="panel11d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Can I change the date after I’ve made a reservation?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Yes. You always have the ability to view and edit a reservation
              when signed into your account.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel12"}
          onChange={handleChange("panel12")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel12d-content"
            id="panel12d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Can I recharge the gyrocar at and EV recharge station?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Yes, the gyrocars can be charged at any standard EV station.
              However, other vehicles cannot access the GyroGoGo chargers; the
              chargers have a deterrent feature that prevent such use.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel13"}
          onChange={handleChange("panel13")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel13d-content"
            id="panel13d-header"
          >
            <Typography component="h3" variant="subtitle2">
              What do I do if there is a mechanical problem during my rental?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              textAlign={"justify"}
              sx={{ maxWidth: { sm: "100%", md: "98%" } }}
            >
              Just call our 800 Customer Service number and we will promptly
              send a mechanic with a replacement vehicle to assist you.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
