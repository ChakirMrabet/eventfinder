// Generic
import React from "react";
import { compose, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import HomeIcon from "@material-ui/icons/Home";

// JS styles
const styles = {
  root: {
    color: "green",
    height: "1em",
    width: "1em",
    "&:hover": {
      color: "red"
    },
    zIndex: 1000,
    marginTop: "-0.5em",
    marginLeft: "-0.5em"
  }
};

// Component definition
const Component = ({ classes }) => (
  <Tooltip title="Address you entered">
    <HomeIcon className={classes.root} />
  </Tooltip>
);

// Enhance and export
export default compose(
  withStyles(styles),
  pure
)(Component);
