import React from "react";
import { compose, withProps, pure } from "recompose";
import sanitizeHtml from "sanitize-html";
import he from "he";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
  <ListItem>
    <ListItemText primary="Description" secondary={text} />
  </ListItem>
);

// Enhance and export
export default compose(
  withProps(({ text }) => ({
    text: text
      ? he.decode(sanitizeHtml(text, { allowedTags: [] }))
      : "There is no description for this event"
  })),
  withStyles(styles),
  pure
)(Component);
