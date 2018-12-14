// Generic
import React from "react";
import { compose, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import FlagIcon from "@material-ui/icons/Flag";

// JS styles
const styles = {
  root: {
    color: "green",
    height: "2em",
    width: "2em",
    "&:hover": {
      color: "red"
    }
  }
};

// Component definition
const Component = ({ classes }) => (
  <Tooltip title="Address you entered">
    <FlagIcon className={classes.root} />
  </Tooltip>
);

// Enhance and export
export default compose(
  withStyles(styles),
  pure
)(Component);
