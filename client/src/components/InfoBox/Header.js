import React from "react";
import { compose, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "@material-ui/core/CardHeader";

// JS styles
const styles = {
  root: {
    backgroundColor: "#c19c0f"
  },
  title: {
    color: "white"
  }
};

const Component = ({ classes, title, startTime }) => (
  <CardHeader
    classes={{ root: classes.root, title: classes.title }}
    title={title}
    subheader={startTime}
  />
);

export default compose(
  withStyles(styles),
  pure
)(Component);
