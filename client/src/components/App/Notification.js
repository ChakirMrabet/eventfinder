import React from "react";
import { compose, pure } from "recompose";

// Material UI
import Snackbar from "@material-ui/core/Snackbar";

const Component = ({ text, onClose }) => (
  <Snackbar
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    open={Boolean(text)}
    autoHideDuration={5000}
    message={text}
    onClose={onClose}
  />
);

export default compose(pure)(Component);
