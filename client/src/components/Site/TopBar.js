import React from "react";
import { compose, withState, withHandlers, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import MenuIcon from "@material-ui/icons/Menu";
import AccountIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

// Import actions
import { searchEvent } from "../../redux/actions/events";

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  toolBar: {
    justifyContent: "space-between"
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  search: {
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
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    width: "100%"
  }
});

const Component = ({
  classes,
  toggleSideBar,
  handleSearch,
  setSearchText,
  searchText
}) => (
  <AppBar className={classes.appBar} position="fixed">
    <ToolBar className={classes.toolBar}>
      <div className={classes.logo}>
        <IconButton className={classes.menuButton} color="inherit">
          <MenuIcon onClick={() => toggleSideBar()} />
        </IconButton>
        <Typography variant="h6" color="inherit">
          EventFinder
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Address, ZIP code, or City"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <Select>
          <MenuItem value={10}>Today</MenuItem>
          <MenuItem value={20}>This Week</MenuItem>
          <MenuItem value={30}>Next Week</MenuItem>
          <MenuItem value={30}>Day</MenuItem>
        </Select>
      </div>
      <div>
        <IconButton color="inherit">
          <AccountIcon />
        </IconButton>
      </div>
    </ToolBar>
  </AppBar>
);

export default compose(
  withState("searchText", "setSearchText", ""),
  connect(
    null,
    dispatch => bindActionCreators({ searchEvent }, dispatch)
  ),
  withHandlers({
    handleSearch: ({ searchText, setSearchText, searchEvent }) => ({ keyCode }) => {
      if (keyCode === 13) {
        searchEvent(searchText);
        setSearchText("");
      }
    }
  }),
  withStyles(styles),
  pure
)(Component);
