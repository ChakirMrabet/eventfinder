// Generic
import React from "react";
import {
  compose,
  pure
} from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import LinearProgress from "@material-ui/core/LinearProgress";

// JS styles
const styles = {
  loader: {
    marginTop: "2em"
  }
};

// Component definition
const Component = ({ classes, open }) => (
  <Dialog open={open}>
    <DialogTitle>Tracking your position</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Allow the site to track your position by accepting the question.
      </DialogContentText>
      <LinearProgress className={classes.loader} />
    </DialogContent>
  </Dialog>
);

// Enhance and export
export default compose(
  withStyles(styles),
  pure
)(Component);
