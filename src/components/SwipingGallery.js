/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import styles from "../styles/card.module.css";
import { Paper } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Aos from "aos";

SwiperCore.use([Autoplay]);

const SwipingGallery = ({ cardData, theme }) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper
          data-aos="fade-up"
          className={
            cardData.gallery.images.length > 1 &&
            `${"swiper"} ${styles.componentContainer}`
          }
          style={{
            backgroundColor: theme.palette.background.paper,
            direction: theme.direction,
          }}
        >
          <h1
            className={
              cardData.gallery.images.length > 0
                ? styles.sectionTitle
                : styles.hidden
            }
            style={{ color: theme.palette.primary.main }}
          >
            {cardData.direction === "rtl" ? "גלריה" : "Gallery"}
          </h1>
          <Swiper
            className={"swiper"}
            speed={900}
            lazy="true"
            slidesPerView={1}
            spaceBetween={100}
            centeredSlides="true"
            autoplay={{
              delay: 7500,
              disableOnInteraction: false,
            }}
            loop="true"
          >
            {cardData.gallery.images.map((item, index) => (
              <>
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <a
                    href={item.url}
                    className={styles.noTextDecoration}
                    style={{ color: theme.palette.text.primary }}
                    key={{ index }}
                  >
                    <img
                      className={styles.noTextDecoration}
                      style={{ color: theme.palette.text.primary }}
                      src={item.imgSrc}
                    />
                    <h3>{item.text}</h3>
                  </a>
                </SwiperSlide>
                ,
              </>
            ))}
          </Swiper>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default SwipingGallery;
