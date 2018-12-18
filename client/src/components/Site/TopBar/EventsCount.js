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

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  number: {
    fontWeight: "bold",
    color: "white"
  },
  text: {
    fontSize: "10px",
    color: "white"
  }
};

const Component = ({ classes, count }) => (
  <div className={classes.root}>
    <Typography className={classes.number} variant="h6">{count}</Typography>
    <Typography className={classes.text}>events</Typography>
  </div>
);

export default compose(
  withStyles(styles),
  branch(
    ({ events }) => events,
    renderComponent(({ events, ...rest }) => <Component count={events} {...rest} />),
    renderNothing
  ),
  pure
)();
