import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "../styles/card.module.css";

const IframeSection = (props) => {
  const componentContainerBgColor = {
    backgroundColor: props.colors.glassColor + "80",
    order: props.jsonData.order,
  };
  return (
    <div
      data-aos="fade-up"
      className={`${styles.mainContentContainer} ${styles.componentContainer}`}
      style={componentContainerBgColor}
    >
      <h1 className={styles.sectionTitle}>iframe</h1>
      <div className={styles.mainContent}>
        <iframe
          class={styles.iframeStyle}
          src="https://www.example.com"
          title="title"
        ></iframe>
      </div>
    </div>
  );
};

export default IframeSection;
