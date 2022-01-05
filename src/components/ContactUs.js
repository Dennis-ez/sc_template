import React, { useEffect, useRef, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "../styles/card.module.css";
import {
  TextField,
  Button,
  Paper,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Mail } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
let contactUsTitle;

const ContactUs = ({ cardData, theme }) => {
  const [showSnackBar, toggleSnackBar] = useState(false);
  const [showLoading, toggleShowLoading] = useState(false);
  const [fullName, setFullName] = useState({
    fullName: null,
    error: false,
    errMsg: null,
  });
  const [emailAddress, setEmailAddress] = useState({
    emailAddress: null,
    error: false,
    errMsg: null,
  });
  const [phoneNumber, setPhoneNumber] = useState({
    phoneNumber: null,
    error: false,
    errMsg: null,
  });
  const [message, setMessage] = useState({
    message: null,
    error: false,
    errMsg: null,
  });

  const validation = () => {
    let valid = true;
    const phoneNumberTest = /\b0\d{9}\b/;
    const emailTest = /([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})/;
    if (!fullName.fullName) {
      setFullName({
        fullName: null,
        error: true,
        errMsg: "אנא הקלד שם מלא",
      });
      valid = false;
    }
    if (!message.message) {
      setMessage({ message: null, error: true, errMsg: "אנא הקלד הודעה" });
      valid = false;
    }
    if (!emailTest.test(emailAddressRef.current.value)) {
      setEmailAddress({
        emailAddress: emailAddressRef.current.value,
        error: true,
        errMsg: "כתובת מייל שגוייה",
      });
      valid = false;
      emailAddressRef.current.value = "";
    }
    if (!phoneNumberTest.test(phoneNumber.phoneNumber)) {
      setPhoneNumber({
        phoneNumber: null,
        error: true,
        errMsg: "מספר טלפון שגוי",
      });
      phoneNumberRef.current.value = "";
      valid = false;
    }
    if (valid) {
      toggleShowLoading(true);
      sendMail();
    }
  };

  const sendMail = () => {
    let userModel = {
      fromEmail: "dolphinsoftwebmail@dolphinsoft.co.il",
      subject: `SwiftCard Message`,
      Body: `
        <div style="direction: ltr;">
         Name: ${fullName.fullName}<br>
         Phone Number: ${phoneNumber.phoneNumber}<br>
         Email: ${emailAddress.emailAddress}<br>
         Message:${message.message}<br>
        </div>`,
      toEmails: [cardData.email],
    };
    let json = JSON.stringify(userModel);

    //Spotad Server
    let xhttp_spotad = new XMLHttpRequest();
    let url_spotad = "https://www.adsil1.com/EmailService/api/v1/emails";
    xhttp_spotad.open("PUT", url_spotad, true);
    xhttp_spotad.setRequestHeader(
      "Content-type",
      "application/json; charset=utf-8"
    );
    xhttp_spotad.onreadystatechange = function () {
      if (xhttp_spotad.readyState === 4 && xhttp_spotad.status === 200) {
        fullNameRef.current.value = "";
        emailAddressRef.current.value = "";
        phoneNumberRef.current.value = "";
        messageRef.current.value = "";
        toggleShowLoading(false);
        toggleSnackBar(true);
      }
    };
    xhttp_spotad.send(json);
  };

  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const emailAddressRef = useRef();
  const messageRef = useRef();

  cardData.direction === "ltr"
    ? (contactUsTitle = "Contact Me")
    : (contactUsTitle = "צרו קשר");

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        data-aos="fade-up"
        className={
          cardData && `${styles.contactUsForm} ${styles.componentContainer}`
        }
        style={{
          backgroundColor: theme.palette.background.paper,
          direction: theme.direction,
        }}
      >
        <h1
          className={styles.sectionTitle}
          style={{ color: theme.palette.primary.main }}
        >
          {cardData.direction === "rtl" ? "צרו קשר" : "Contact Me"}
        </h1>
        <div className={styles.contactUsItem}>
          <p
            className={styles.formLabel}
            style={{ color: theme.palette.primary.main }}
          >
            {cardData.direction === "rtl" ? "שם מלא:" : "Full Name:"}
          </p>
          <TextField
            placeholder={fullName.errMsg}
            error={fullName.error}
            onChange={() => {
              setFullName({
                fullName: fullNameRef.current.value,
                error: false,
              });
            }}
            inputRef={fullNameRef}
            id="filled-basic"
            variant="standard"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          />
        </div>
        <div className={styles.contactUsItem}>
          <p
            className={styles.formLabel}
            style={{ color: theme.palette.primary.main }}
          >
            {cardData.direction === "rtl" ? "טלפון:" : "Phone:"}
          </p>
          <TextField
            placeholder={phoneNumber.errMsg}
            error={phoneNumber.error}
            onChange={() => {
              setPhoneNumber({
                phoneNumber: phoneNumberRef.current.value,
                error: false,
              });
            }}
            inputRef={phoneNumberRef}
            id="filled-basic"
            variant="standard"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          />
        </div>
        <div className={styles.contactUsItem}>
          <p
            className={styles.formLabel}
            style={{ color: theme.palette.primary.main }}
          >
            {cardData.direction === "rtl" ? "אימייל:" : "Email:"}
          </p>

          <TextField
            placeholder={emailAddress.errMsg}
            error={emailAddress.error}
            onChange={() => {
              setEmailAddress({
                emailAddress: emailAddressRef.current.value,
                error: false,
              });
            }}
            inputRef={emailAddressRef}
            id="filled-basic"
            variant="standard"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
          />
        </div>
        <div className={styles.contactUsItem}>
          <p
            className={styles.formLabel}
            style={{ color: theme.palette.primary.main }}
          >
            {cardData.direction === "rtl" ? "הודעה:" : "Message:"}
          </p>

          <TextField
            placeholder={message.errMsg}
            error={message.error}
            onChange={() => {
              setMessage({
                message: messageRef.current.value,
                error: false,
              });
            }}
            inputRef={messageRef}
            id="filled-basic"
            variant="standard"
            multiline="true"
            rows={3}
            maxRows={3}
            style={{
              backgroundColor: theme.palette.background.default,

              "&::placeholder": {
                color: "gray",
              },
            }}
          />
        </div>

        <Button
          variant="contained"
          endIcon={<Mail />}
          style={{}}
          onClick={() => validation()}
        >
          <span>{cardData.direction === "rtl" ? "שלח" : "Submit"}</span>
        </Button>
        <Backdrop
          style={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={showLoading.valueOf()}
        >
          שולח..
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={7000}
        onClose={() => {
          toggleSnackBar(false);
        }}
      >
        <Alert
          onClose={() => {
            toggleSnackBar(false);
          }}
          severity="success"
          style={{
            width: "100%",
            color: cardData.fontColor,
            backgroundColor: cardData.componentBgColor,
          }}
        >
          ההודעה נשלחה בהצלחה
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ContactUs;
