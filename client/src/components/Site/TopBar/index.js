import React from "react";
import {
  compose,
  lifecycle,
  withState,
  withHandlers,
  pure,
  withProps
} from "recompose";
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
import SearchIcon from "@material-ui/icons/Search";

// Custom Components
import Select from "./SelectComponent";
import EventsCount from "./EventsCount";

// Import actions
import { selectRange } from "../../../redux/actions/ranges";
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
    justifyContent: "space-between",
    minHeight: "unset"
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  menuButton: {
    marginLeft: -12
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing.unit * 4,
    width: "100%"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    width: "100%"
  },
  right: {
    display: "flex"
  }
});

const Component = ({
  classes,
  categories,
  times,
  ranges,
  events,
  toggleSideBar,
  handleAddressSearch,
  handleSearch,
  searchText,
  setSearchText,
  searchWhen,
  setSearchWhen,
  selectedRange,
  selectRange,
  searchCategory,
  setSearchCategory
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
          <InputBase
            placeholder="Address, ZIP code, or City"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyDown={handleAddressSearch}
          />
        </div>
        <Select
          options={times.items}
          defaultValue={searchWhen}
          onChange={setSearchWhen}
        />
        <Select
          options={categories.items}
          defaultValue={searchCategory}
          onChange={setSearchCategory}
        />
        <Select
          options={ranges.items}
          defaultValue={selectedRange}
          onChange={selectRange}
        />
        <IconButton className={classes.searchButton} color="inherit">
          <SearchIcon onClick={handleSearch} />
        </IconButton>
      </div>
      <div className={classes.right}>
        <EventsCount events={events} />
      </div>
    </ToolBar>
  </AppBar>
);

export default compose(
  connect(
    ({ map, categories, times, ranges, events }) => ({
      searchText: map.currentAddress,
      events: events.total,
      categories,
      times,
      ranges,
      selectedRange: ranges.selected
    }),
    dispatch =>
      bindActionCreators(
        { fetchCategories, selectRange, selectCategory, searchEvent },
        dispatch
      )
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchCategories();
    }
  }),
  withState("searchText", "setSearchText", ({ searchText }) => searchText),
  withState("searchWhen", "setSearchWhen", "today"),
  withState("searchCategory", "setSearchCategory", "all"),
  withHandlers({
    handleSearch: ({
      searchText,
      searchEvent,
      searchWhen,
      selectedRange,
      searchCategory
    }) => () =>
      searchEvent(searchText, searchWhen, selectedRange, searchCategory)
  }),
  withHandlers({
    handleAddressSearch: ({ handleSearch }) => ({ keyCode }) => {
      if (keyCode === 13) {
        handleSearch();
      }
    }
  }),
  withStyles(styles),
  withProps(props => console.log(props)),
  pure
)(Component);
