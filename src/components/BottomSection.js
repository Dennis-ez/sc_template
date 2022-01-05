import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import styles from "../styles/card.module.css";
import Fab from "@mui/material/Fab";
import { ThemeProvider } from "@emotion/react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
const whatsAppText =
  "ראו את כרטיס הסוויפט שיצרתי בswiftCard בקישור הבא :" + window.location.href;

const BottomSection = ({ cardData, theme }) => {
  const [showAlert, toggleShowAlert] = useState(false);

  return (
    <div className={styles.bottomSection}>
      <p
        style={{
          color: theme.palette.primary.main,
        }}
      >
        {cardData.direction === "rtl"
          ? "שתפו את כרטיס הביקור שלכם"
          : "Share your business card"}
      </p>
      <p
        style={{
          color: theme.palette.primary.main,
          direction: cardData.direction,
        }}
      >
        {cardData.direction === "rtl" ? "נבנה בעזרת" : "Built using"}
        {"  "}
        <a
          href="http://swiftcard.co"
          style={{ color: theme.palette.primary.main }}
        >
          swiftCard
        </a>
      </p>
      <div className={styles.bottomSectionContent}>
        <ThemeProvider theme={theme}>
          <Fab
            color="primary"
            aria-label=""
            href={"whatsapp://send?text=" + whatsAppText}
          >
            <SocialIcon
              network="whatsapp"
              fgColor={theme.palette.primary.contrastText}
              bgColor="transparent"
              style={{ height: 60, width: 60 }}
            />
          </Fab>
          <Fab
            color="primary"
            aria-label=""
            onClick={() => (
              navigator.clipboard.writeText(window.location.href),
              toggleShowAlert(true)
            )}
          >
            <SocialIcon
              fgColor={theme.palette.primary.contrastText}
              bgColor="transparent"
              style={{ height: 60, width: 60 }}
            />
          </Fab>
          <Fab
            color="primary"
            aria-label=""
            href={
              "mailto:?Subject=Check%20out%20my%20swiftCard%20%21&Body=Hello%2C%0AI%20invite%20you%20to%20check%20out%20my%20swiftCard%20here%20%3A%0A" +
              `${window.location.href}`
            }
          >
            <SocialIcon
              network="email"
              fgColor={theme.palette.primary.contrastText}
              bgColor="transparent"
              style={{ height: 60, width: 60 }}
            />
          </Fab>
        </ThemeProvider>
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => toggleShowAlert(false)}
          message="Link copied to clipboard"
          action={
            <IconButton size="small" aria-label="close" color="inherit">
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </div>
  );
};

export default BottomSection;
