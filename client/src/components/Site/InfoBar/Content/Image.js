import React from "react";
import {
  compose,
  mapProps,
  branch,
  renderComponent,
  renderNothing,
  pure
} from "recompose";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

// JS Styles
const styles = {
  root: {
    height: 125
  }
};

// Component definition
const Component = ({ classes, image }) => (
  <CardMedia className={classes.root} image={image} />
);

// Enhance and export
export default compose(
  mapProps(({ event }) => ({
    image:
      event.image && event.image.image ? event.image.image.block250.url : null
  })),
  withStyles(styles),
  branch(({ image }) => image, renderComponent(Component), renderNothing),
  pure
)();
