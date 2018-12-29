import React from "react";
import { compose, branch, renderComponent, pure } from "recompose";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// Custom Components
import Header from "./Header";
import Image from "./Image";
import Body from "./Body";

// JS styles
const styles = {};

// Component definition when no event is selected
const ComponentLoading = () => <p>Loading...</p>;

// Component definition when an event is selected
const Component = ({ event }) => (
  <div>
    <Header
      title={event.title}
      startTime={event.startTime}
      stopTime={event.stopTime}
    />
    <Image event={event} />
    <Body event={event} />
  </div>
);

// Enhance and export
export default compose(
  withStyles(styles),
  branch(
    ({ loading, event }) => loading || event === null,
    renderComponent(ComponentLoading),
    renderComponent(Component)
  ),
  pure
)();
