import React, { useEffect } from "react";
import styles from "../styles/card.module.css";
import Aos from "aos";
import defaultProfilePic from "../images/default-profile-img.jpeg";
import defaultBannerImg from "../images/default-banner-img.jpg";

const TopBanner = ({ cardData, theme }) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  let topBannerStyle = { color: theme.palette.primary.main };

  return (
    <div data-aos="fade-in">
      <div>
        <div className={styles.topBanner}>
          <img
            className={styles.topBanner}
            src={
              cardData.images.topBannerImg
                ? cardData.images.topBannerImg
                : defaultBannerImg
            }
            alt={cardData.name}
          />

          <div className={styles.profilePictureContainer}>
            <img
              className={styles.profilePicture}
              src={
                cardData.profileImg ? cardData.profileImg : defaultProfilePic
              }
              alt=""
            />
          </div>
        </div>
        <div className={styles.topText}>
          <div className={styles.topTextName} style={topBannerStyle}>
            {cardData.name}
          </div>
          <div className={styles.topTextTitle} style={topBannerStyle}>
            {cardData.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
