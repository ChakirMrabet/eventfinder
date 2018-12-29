import React from "react";
import {
  compose,
  withProps,
  mapProps,
  branch,
  renderComponent,
  pure
} from "recompose";
import moment from "moment";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";

// JS styles
const styles = {
  root: {
    backgroundColor: "#728074",
    maxHeight: 150,
    overflowY: "hidden"
  },
  title: {
    color: "white",
    fontSize: "1em"
  },
  rangeDate: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  date: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  day: {},
  year: {}
};

const DateBoxSingleDate = ({ classes, startTime }) => (
  <div className={classes.date}>
    <Typography className={classes.day} variant="h6">
      {startTime.day}
    </Typography>
    <Typography className={classes.year}>{startTime.year}</Typography>
  </div>
);

const DateBoxRangeDate = ({ classes, startTime, stopTime }) => (
  <div className={classes.rangeDate}>
    <div className={classes.date}>
      <Typography className={classes.day} variant="button">
        {startTime.day}
      </Typography>
      <Typography className={classes.year}>{startTime.year}</Typography>
    </div>
    <div className={classes.date}>
      <Typography className={classes.day} variant="button">
        {stopTime.day}
      </Typography>
      <Typography className={classes.year}>{stopTime.year}</Typography>
    </div>
  </div>
);

const ComponentSingleDate = ({ classes, title, startTime }) => (
  <CardHeader
    classes={{ root: classes.root, title: classes.title }}
    title={title}
    avatar={<DateBoxSingleDate classes={classes} startTime={startTime} />}
  />
);

const ComponentDateRange = ({ classes, title, startTime, stopTime }) => (
  <CardHeader
    classes={{ root: classes.root, title: classes.title }}
    title={title}
    avatar={
      <DateBoxRangeDate
        classes={classes}
        startTime={startTime}
        stopTime={stopTime}
      />
    }
  />
);

export default compose(
  withStyles(styles),
  withProps(({ startTime, stopTime }) => ({
    start: moment(startTime),
    stop: moment(stopTime)
  })),
  mapProps(props => ({
    ...props,
    startTime: {
      day: props.start.format("MMM DD").toUpperCase(),
      year: props.start.format("YYYY")
    },
    stopTime: props.stopTime
      ? {
          day: props.stop.format("MMM DD").toUpperCase(),
          year: props.stop.format("YYYY")
        }
      : null
  })),
  branch(
    ({ stopTime }) => stopTime,
    renderComponent(ComponentDateRange),
    renderComponent(ComponentSingleDate)
  ),
  pure
)();
