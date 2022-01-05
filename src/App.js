/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import "./App.css";
import TopBanner from "./components/TopBanner";
import Socials from "./components/Socials";
import MainContent from "./components/MainContent";
import Qa from "./components/Qa";
import ContactUs from "./components/ContactUs";
import BottomSection from "./components/BottomSection";
import SwipingGallery from "./components/SwipingGallery";
import Vcard from "./components/Vcard";
import styles from "./styles/card.module.css";
import { createTheme } from "@mui/material";
import { ColorLuminance } from "./ColorLuminance";
import { BackDropLayer } from "./BackDropLayer";
import MenuSection from "./components/MenuSection";
/////////////////////////////
const rtlID = "61d1ca1179ddf315af528f18";
const testID = "61d1cf6979ddf315af5290f7";
const testID2 = "61d300cc79ddf315af529d28";
const ltrID = "61aa12b7b0f308c9372b12d1";
let cardID = testID2;
/////////////////////////////

let theme = createTheme({});
let backgroundStyle;
const apiURL =
  "https://dolphincard-server-pir3z.ondigitalocean.app/api/card/" + cardID;

function themeInit(cardData) {
  (backgroundStyle = {
    backgroundColor: cardData.content.bgColor,
    backgroundImage: `url(${cardData.content.images.bgImg})`,
  }),
    (theme = createTheme({
      direction: cardData?.content.direction,
      palette: {
        text: {
          primary: cardData?.content.fontColor,
        },
        primary: {
          main: cardData?.content.accentColor,
          contrastText: ColorLuminance(cardData?.content.componentBgColor, 1),
        },
        background: {
          paper: cardData?.content.componentBgColor + "D9",
          default: cardData?.content.componenetBgColor,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              "&:hover": {
                backgroundColor: ColorLuminance(
                  cardData?.content.accentColor,
                  0.2
                ),
              },
            },
          },
        },
        MuiFab: {
          styleOverrides: {
            root: {
              textTransform: "none",
              direction: cardData?.content.direction,
              "&:hover": {
                backgroundColor: ColorLuminance(
                  cardData?.content.accentColor,
                  0.2
                ),
              },
            },
          },
        },
        MuiAccordion: {
          styleOverrides: {
            root: {
              backgroundColor: cardData?.content.accentColor,
              padding: 15,
              width: "70%",
              "&$expanded": {
                borderRadius: 50,
              },
              "&:hover": {
                backgroundColor: ColorLuminance(
                  cardData?.content.accentColor,
                  0.1
                ),
              },
            },
          },
        },
      },
    }));
}

function App() {
  const [cardData, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setData(data.card);
      themeInit(data.card);
      setIsLoaded(true);
      console.log(data.card);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.App} style={backgroundStyle}>
      {!cardData ? (
        BackDropLayer
      ) : (
        <>
          <Vcard cardData={cardData.content} theme={theme} />
          <TopBanner cardData={cardData.content} theme={theme} />
          {cardData.content.socials.isActive && (
            <Socials cardData={cardData.content} theme={theme} />
          )}
          <MenuSection menuData={cardData.content.menuButtons} theme={theme} />
          {cardData.content.mainContent.isActive && (
            <MainContent cardData={cardData.content} theme={theme} />
          )}
          {cardData.content.Qa[0].isActive && (
            <Qa qaData={cardData.content?.Qa} theme={theme} />
          )}
          {cardData.content.gallery.isActive && (
            <SwipingGallery cardData={cardData.content} theme={theme} />
          )}
          <ContactUs cardData={cardData.content} theme={theme} />
          <BottomSection cardData={cardData.content} theme={theme} />
        </>
      )}
    </div>
  );
}

export default App;
