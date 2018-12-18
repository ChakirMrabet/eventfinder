// Generic
import React from "react";
import PropTypes from "prop-types";
import {
  compose,
  setPropTypes,
  withState,
  withHandlers,
  branch,
  renderComponent,
  pure
} from "recompose";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// Styles definition
const styles = theme => ({
  root: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    color: "white"
  },
  select: {
    width: "100%",
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  }
});

const Loading = () => <Typography>Loading..</Typography>;

// Component definition
const Component = ({ classes, options, selectedValue, handleValueChange }) => (
  <div>
    <Select
      classes={{
        root: classes.root,
        select: classes.select
      }}
      disableUnderline
      value={selectedValue}
      onChange={handleValueChange}
    >
      {options.map((option, i) => (
        <MenuItem key={i} value={option.value}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  </div>
);

// Enhance and export
export default compose(
  setPropTypes({
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  }),
  withState(
    "selectedValue",
    "setSelectedValue",
    ({ defaultValue }) => defaultValue
  ),
  withHandlers({
    handleValueChange: ({ setSelectedValue, onChange }) => e => {
      setSelectedValue(e.target.value);
      if (onChange) {
        onChange(e.target.value);
      }
    }
  }),
  withStyles(styles),
  branch(
    ({ options }) => options.length > 0,
    renderComponent(Component),
    renderComponent(Loading)
  ),
  pure
)();
