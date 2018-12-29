import React from "react";
import { compose, branch, renderComponent, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
  root: {
    color: "inherit",
    width: "100%"
  },
  input: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    width: "100%"
  }
});

const Loader = () => <p>Loading...</p>;

const Component = ({ classes, defaultValue, onChange }) => (
  <InputBase
    placeholder="Address, ZIP code, or City"
    classes={{ root: classes.root, input: classes.input }}
    defaultValue={defaultValue}
    onKeyDown={onChange}
  />
);

export default compose(
  withStyles(styles),
  branch(
    ({ loading }) => loading,
    renderComponent(Loader),
    renderComponent(Component)
  ),
  pure
)();
