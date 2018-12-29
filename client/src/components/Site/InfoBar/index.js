import React from "react";
import { compose, pure } from "recompose";
import config from "../../../config";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

// Custom Components
import Content from "./Content";

// JS Styles
const styles = {
  drawer: {
    width: config.infoBarWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: config.infoBarWidth
  }
};

// Component definition
const Component = ({ classes, open, loading, event }) => (
  <Drawer
    className={classes.drawer}
    anchor="right"
    variant="persistent"
    classes={{
      paper: classes.drawerPaper
    }}
    open={open}
  >
    <Content event={event} loading={loading} />
  </Drawer>
);

// Enhance and export
export default compose(
  withStyles(styles),
  pure
)(Component);
