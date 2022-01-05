import React, { useEffect } from "react";
import styles from "../styles/card.module.css";
import { Paper, ThemeProvider } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import Fab from "@mui/material/Fab";

const MenuSection = ({ menuData, theme }) => {
  const socialStyle = {
    backgroundColor: theme.palette.background.paper,
    direction: theme.direction,
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper
        className={`${styles.menuButtons} ${styles.componentContainer}`}
        style={socialStyle}
      >
        {console.log(menuData.menuButtons)}
        {menuData.map((item, index) => (
          <li key={index}>
            <a href={item.url} target="_blank" rel="noreferrer">
              <Fab
                color="primary"
                variant="extended"
                style={{
                  padding: "17px",
                  margin: "5px",
                }}
                size="large"
              >
                {item.name}
              </Fab>
            </a>
          </li>
        ))}
      </Paper>
    </ThemeProvider>
  );
};

export default MenuSection;
