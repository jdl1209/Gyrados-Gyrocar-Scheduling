'use client'

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ({data}: {data:any}) {
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
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        Frequently Asked&nbsp;
      
      <Typography
          component="span"
          variant="h4"
          sx={{
            color: "#34adad",
          }}
        >
          Questions
        </Typography>
        </Typography>
      <Box sx={{ width: "100%" }}>
        {data.map((item: any, idx: any) => {
          const id = `panel${item.faqID}`;

          return (<Accordion
            expanded={expanded === id}
            onChange={handleChange(id)}
            key={idx}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${id}d-content`}
              id={`${id}d-header`}
            >
              <Typography component="h3" variant="subtitle2">
                {item.faqQuestion}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                textAlign={"justify"}
                sx={{ maxWidth: { sm: "100%", md: "98%" } }}
              >
                {item.faqAnswer}
              </Typography>
            </AccordionDetails>
          </Accordion>);
        })}
      </Box>
    </Container>
  );
}
