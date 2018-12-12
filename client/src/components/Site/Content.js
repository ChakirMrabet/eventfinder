import React from "react";
import { compose, withState, withHandlers, lifecycle, pure } from "recompose";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 5
  }
});

const Component = ({ children, pageHeight }) =>
  React.Children.map(children, child => {
    return React.cloneElement(child, { pageHeight });
  });

export default compose(
  withState("pageHeight", "setPageHeight", 400),
  withHandlers({
    updateDimensions: ({ setPageHeight }) => () => {
      setPageHeight(window.innerHeight);
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.updateDimensions();
      window.addEventListener("resize", this.props.updateDimensions());
    },
    componentWillUnmount() {
      window.removeEventListener("resize", this.props.updateDimensions());
    }
  }),
  withStyles(styles),
  pure
)(Component);
