import React from "react";
import { compose, branch, renderComponent, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

// JS styles
const styles = {
  root: {
    margin: 5,
    backgroundColor: "#eeeeee",
    height: 300,
    overflowY: "auto"
  }
};

// Component when there is a description
const Component = ({ classes, text }) => (
  <div className={classes.root}>
    <Typography>{text}</Typography>
  </div>
);

// Component when there is no description
const ComponentEmpty = () => (
  <Typography>There is no description for this event.</Typography>
);

// Enhance and export
export default compose(
  withStyles(styles),
  branch(
    ({ text }) => text,
    renderComponent(Component),
    renderComponent(ComponentEmpty)
  ),
  pure
)();
