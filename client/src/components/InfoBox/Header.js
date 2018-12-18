import React from "react";
import { compose, mapProps, branch, renderComponent, pure } from "recompose";
import moment from "moment";

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

const ComponentSingleDate = ({ classes, title, startTime }) => (
  <CardHeader
    classes={{ root: classes.root, title: classes.title }}
    title={title}
    subheader={startTime}
  />
);

const ComponentDateRange = ({ classes, title, startTime, stopTime }) => (
  <CardHeader
    classes={{ root: classes.root, title: classes.title }}
    title={title}
    subheader={`${startTime} to ${stopTime}`}
  />
);

export default compose(
  withStyles(styles),
  mapProps(props => ({
    ...props,
    startTime: moment(props.startTime).format("MMM DD, YYYY"),
    stopTime: props.stopTime ? moment(props.stopTime).format("MMM DD, YYYY") : null
  })),
  branch(
    ({ stopTime }) => stopTime,
    renderComponent(ComponentDateRange),
    renderComponent(ComponentSingleDate)
  ),
  pure
)();
