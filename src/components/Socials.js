import React, { useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import styles from "../styles/card.module.css";
import { Paper, ThemeProvider } from "@mui/material";
import Aos from "aos";
import "aos/dist/aos.css";
import Fab from "@mui/material/Fab";

const Socials = ({ cardData, theme }) => {
  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

  const socialName = (item, theme) => {
    let res;
    switch (item.name) {
      case "facebook":
        theme.direction === "rtl" ? (res = "פייסבוק") : (res = "Facebook");
        break;
      case "whatsapp":
        theme.direction === "rtl" ? (res = "וואטסאפ") : (res = "Whatsapp");
        item.url = "whatsapp://send?phone=+972" + cardData?.phone;
        break;
      case "linkedin":
        theme.direction === "rtl" ? (res = "לינקדאין") : (res = "Linkedin");
        break;
      case "instagram":
        theme.direction === "rtl" ? (res = "אינסטגרם") : (res = "Instagram");
        break;
      case "tiktok":
        theme.direction === "rtl" ? (res = "טיקטוק") : (res = "Tiktok");
        break;
      case "telegram":
        theme.direction === "rtl" ? (res = "טלגרם") : (res = "Telegram");
        break;
      case "email":
        theme.direction === "rtl" ? (res = "אימייל") : (res = "Email");
        item.url = "mailto:" + item.url;
        break;
      default:
        break;
    }
    return res;
  };

  const socialStyle = {
    backgroundColor: theme.palette.background.paper,
    direction: theme.direction,
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        className={`${styles.socials} ${styles.componentContainer}`}
        style={socialStyle}
      >
        {cardData.socials.content.map(
          (item, index) =>
            item.isActive && (
              <li key={index}>
                <a href={item.url} target="_blank">
                  <Fab
                    color="primary"
                    variant="extended"
                    style={{
                      padding: "10px",
                      margin: "5px",
                    }}
                    size="large"
                  >
                    <p>{socialName(item, theme)}</p>
                    {
                      <SocialIcon
                        network={item.name}
                        bgColor="transparent"
                        fgColor={theme.palette.primary.contrastText}
                        style={{ height: 40, width: 40 }}
                      ></SocialIcon>
                    }
                  </Fab>
                </a>
              </li>
            )
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default Socials;
