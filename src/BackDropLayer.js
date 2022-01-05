import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const BackDropLayer = (
  <Backdrop
    open={true}
    style={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
