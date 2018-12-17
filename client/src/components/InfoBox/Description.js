import React from "react";
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  pure
} from "recompose";

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

const Component = ({ classes, text }) => (
  <div className={classes.root}>
    <Typography>{text}</Typography>
  </div>
);

export default compose(
  withStyles(styles),
  branch(({ text }) => text, renderComponent(Component), renderNothing),
  pure
)();
