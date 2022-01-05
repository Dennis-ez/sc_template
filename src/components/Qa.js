import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "../styles/card.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ThemeProvider, Paper } from "@mui/material";

const Qa = ({ qaData, theme }) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return qaData
    ? qaData.map((qaElement, index) => (
        <ThemeProvider theme={theme}>
          <Paper
            data-aos="fade-up"
            className={
              qaData[0].faqData[0].question &&
              `${styles.faqContainer} ${styles.componentContainer}`
            }
            style={{
              backgroundColor: theme.palette.background.paper,
              direction: theme.direction,
            }}
            key={index}
          >
            {qaElement.faqData.map((item) => (
              <Accordion
                component={Paper}
                elevation={2}
                className={styles.faqItem}
                style={{ color: theme.palette.primary.contrastText }}
                key={item._id}
              >
                <AccordionSummary
                  aria-label="Expand"
                  aria-controls="-content"
                  id="-header"
                  expandIcon={
                    <ExpandMore
                      style={{ color: theme.palette.primary.contrastText }}
                    />
                  }
                >
                  <Typography>
                    <span>{item.question}</span>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>{item.answer}</AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </ThemeProvider>
      ))
    : null;
};

export default Qa;
