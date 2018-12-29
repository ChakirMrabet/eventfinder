import React from "react";
import { compose, mapProps, pure } from "recompose";
import he from "he";

// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// Custom
import Description from "./Description";

const Component = props => (
  <div>
    <List>
      <ListItem>
        <ListItemText primary="Place" secondary={props.venueName} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Address" secondary={props.address} />
      </ListItem>
      <ListItem>
        <ListItemText primary="All Day?" secondary={props.allDay} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Categories" secondary={props.categories} />
      </ListItem>
      <Description text={props.description} />
    </List>
  </div>
);

export default compose(
  mapProps(({ event }) => ({
    ...event,
    address: `${event.address}, ${event.city}, ${event.state} ${event.zip ||
      ""}`,
    allDay: event.allDay ? "Yes" : "No",
    categories: event.categories.map(category => he.decode(category.name)).join(", ")
  })),
  pure
)(Component);

// venueName
// address
// city
// state
// zip
// country
// startTime
// allDay
// categories: [{name, }]
