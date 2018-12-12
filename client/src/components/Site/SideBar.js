import React from "react";
import { compose, pure } from "recompose";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
});

const Component = ({ classes, isOpen }) => (
  <Drawer
    className={classes.drawer}
    variant="persistent"
    classes={{
      paper: classes.drawerPaper
    }}
    open={isOpen}
  >
    <Typography>Hello</Typography>
  </Drawer>
);

export default compose(
  withStyles(styles),
  pure
)(Component);
