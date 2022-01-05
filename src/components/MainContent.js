import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "../styles/card.module.css";
import { Paper, ThemeProvider } from "@mui/material";
const MainContent = ({ cardData, theme }) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  let mainContent = cardData.mainContent.text;

  const contentStyle = {
    color: theme.palette.text.primary,
    direction: cardData.direction,
  };

  return (
    <ThemeProvider theme={theme} data-aos="fade-up">
      <Paper
        className={`${styles.mainContentContainer} ${styles.componentContainer}`}
        style={contentStyle}
      >
        <h1
          className={styles.sectionTitle}
          style={{ color: theme.palette.primary.main }}
        >
          {cardData.mainContent.title}
        </h1>
        <div className={styles.mainContent}>
          <p style={contentStyle}>{ReactHtmlParser(mainContent)}</p>
          {cardData.mainContent.img && (
            <img
              src={cardData.mainContent.img}
              alt="main"
              className={"mainContentImage"}
            ></img>
          )}
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default MainContent;
