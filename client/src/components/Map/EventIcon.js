// Generic
import React from "react";
import classNames from "classnames";
import { compose, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import PlaceIcon from "@material-ui/icons/Place";

// JS styles
const styles = {
  root: {
    cursor: "pointer",
    color: "orange",
    height: "2em",
    width: "2em",
    "&:hover": {
      color: "red"
    },
    marginTop: "-1em",
    marginLeft: "-1em"
  },
  selected: {
    color: "red"
  }
};

// Component definition, not selected
const Component = ({ classes, text, selected, onClick }) => (
  <Tooltip title={text}>
    <PlaceIcon
      className={classNames(classes.root, { [classes.selected]: selected })}
      onClick={onClick}
    />
  </Tooltip>
);

// Enhance and export
export default compose(
  withStyles(styles),
  pure
)(Component);
