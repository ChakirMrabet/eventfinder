import React from "react";
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  pure,
  withProps
} from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

// Custom Components
import Header from "./Header";
import Description from "./Description";

// JS styles
const styles = {
  root: {
    position: "absolute",
    top: 100,
    left: 50,
    zIndex: 1000,
    width: 350,
    maxHeight: 600
  }
};

const ImageBox = ({ image }) => {
  if (image && image.medium) {
    return (
      <CardMedia
        image={image.medium.url}
        style={{ height: parseInt(image.medium.height) }}
      />
    );
  }
  return null;
};

// venueName
// address
// city
// state
// zip
// country
// startTime
// allDay
// categories: [{name, }]

// Component definition
const Component = ({ classes, event }) => (
  <Card className={classes.root}>
    <Header title={event.title} startTime={event.startTime} />
    <ImageBox image={event.image} />
    <CardContent>
      <Description text={event.description} />
    </CardContent>
    <CardActions>
      <Button>Going</Button>
      <Button>Interested</Button>
    </CardActions>
  </Card>
);

// Enhance and export
export default compose(
  withProps(props => console.log(props)),
  withStyles(styles),
  branch(({ event }) => event, renderComponent(Component), renderNothing),
  pure
)(Component);
