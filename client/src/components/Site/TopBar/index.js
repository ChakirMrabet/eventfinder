import React from "react";
import { compose, lifecycle, withState, withHandlers, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";

import MenuIcon from "@material-ui/icons/Menu";
import AccountIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

// Custom Components
import Select from "./SelectComponent";

// Import actions
import {
  fetchCategories,
  selectCategory
} from "../../../redux/actions/categories";
import { searchEvent } from "../../../redux/actions/events";

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
    paddingLeft: theme.spacing.unit * 7,
    width: "100%"
  }
});

const Component = ({
  classes,
  categories,
  times,
  distances,
  toggleSideBar,
  handleSearch,
  setSearchText,
  searchText,
  selectCategory
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
        <Select options={times.items} defaultValue={times.selected} />
        <Select
          options={categories.items}
          defaultValue={categories.selected}
          onChange={selectCategory}
        />
        <Select options={distances.items} defaultValue={distances.selected} />
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
  withState("searchWhen", "setSearchWhen", "today"),
  withState("searchRange", "setSearchRange", 15),
  connect(
    ({ categories, times, distances }) => ({ categories, times, distances }),
    dispatch => bindActionCreators({ fetchCategories, selectCategory, searchEvent }, dispatch)
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchCategories();
    }
  }),
  withHandlers({
    handleSearch: ({ searchText, searchEvent, searchWhen, searchRange }) => ({
      keyCode
    }) => {
      if (keyCode === 13) {
        searchEvent(searchText, searchWhen, searchRange);
      }
    }
  }),
  withStyles(styles),
  pure
)(Component);
