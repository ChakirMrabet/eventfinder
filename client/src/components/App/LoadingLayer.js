// Generic
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
import CircularProgress from "@material-ui/core/CircularProgress";

// JS styles
const styles = {
  fog: {
    width: "100%",
    position: "absolute",
    opacity: 0.5,
    zIndex: 1000,
    backgroundColor: "#aaaaaa"
  },
  loadingLayer: {
    width: "100%",
    position: "absolute",
    zIndex: 1001,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  progress: {
    zIndex: 1002
  }
};

// Component definition
const Component = ({ classes, pageHeight }) => (
  <div>
    <div className={classes.fog} style={{ height: pageHeight }} />
    <div className={classes.loadingLayer} style={{ height: pageHeight }}>
      <CircularProgress className={classes.progress} size={60} />
    </div>
  </div>
);

// Enhance and export
export default compose(
  withStyles(styles),
  branch(({ visible }) => visible, renderComponent(Component), renderNothing),
  pure
)();
