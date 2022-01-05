import { ThemeProvider } from "@emotion/react";
import { Fab } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/card.module.css";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Aos from "aos";
import "aos/dist/aos.css";
const Vcard = ({ cardData, theme }) => {
  const VcardStyle = {
    direction: "rtl",
  };

  const vCardText = () => {
    switch (VcardStyle.direction) {
      case "rtl":
        return "הוסף לאנשי קשר";
      case "ltr":
        return "Add to contacts";
      default:
        break;
    }
  };
  function createVcard() {
    let vCardsJS = require("vcards-js");
    //create a new vCard
    let vCard = vCardsJS();
    //set properties
    vCard.firstName = cardData.name;
    vCard.photo.attachFromUrl(cardData.images.profileImg, "JPEG");
    vCard.workPhone = cardData.phone;
    vCard.title = cardData.title;
    vCard.url = window.location.href;
    vCard.email = cardData.email;
    const element = document.createElement("a");
    element.setAttribute("download", "true");
    const file = new Blob([vCard.getFormattedString()], {
      type: "attachment",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${cardData.name}.vcf`;
    document.body.appendChild(element);
    element.click();
  }
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <ThemeProvider theme={theme} style={{ VcardStyle }} data-aos="fade-up">
      <Fab
        className={styles.vcardFab}
        color="primary"
        variant="extended"
        size="large"
        onClick={() => createVcard()}
      >
        <p> {vCardText()} </p>
        <PermContactCalendarIcon />
      </Fab>
    </ThemeProvider>
  );
};

export default Vcard;
