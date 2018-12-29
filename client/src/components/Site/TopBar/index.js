import React from "react";
import { compose, lifecycle, withState, withHandlers, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// Custom Components
import Address from "./AddressComponent";
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
  right: {
    display: "flex"
  }
});

const Component = ({
  classes,
  tracking,
  initialAddress,
  categories,
  times,
  ranges,
  events,
  toggleSideBar,
  handleAddressSearch,
  handleWhenChange,
  handleCategoryChange,
  handleRangeChange,
  searchWhen,
  selectedRange,
  searchCategory
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
          <Address
            loading={tracking}
            defaultValue={initialAddress}
            onChange={handleAddressSearch}
          />
        </div>
        <Select
          options={times.items}
          defaultValue={searchWhen}
          onChange={handleWhenChange}
        />
        <Select
          options={categories.items}
          defaultValue={searchCategory}
          onChange={handleCategoryChange}
        />
        <Select
          options={ranges.items}
          defaultValue={selectedRange}
          onChange={handleRangeChange}
        />
      </div>
      <div className={classes.right}>
        <EventsCount events={events} />
      </div>
    </ToolBar>
  </AppBar>
);

export default compose(
  connect(
    ({ app, map, categories, times, ranges, events }) => ({
      initialAddress: map.currentAddress,
      events: events.total,
      categories,
      times,
      ranges,
      selectedRange: ranges.selected,
      tracking: app.tracking
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
  withState("searchWhen", "setSearchWhen", "today"),
  withState("searchCategory", "setSearchCategory", "all"),
  withHandlers({
    handleSearch: ({
      searchEvent,
      searchWhen,
      selectedRange,
      searchCategory
    }) => address =>
      searchEvent(address, searchWhen, selectedRange, searchCategory)
  }),
  withHandlers({
    handleAddressSearch: ({ handleSearch }) => ({ keyCode, target }) => {
      if (keyCode === 13) {
        handleSearch(target.value);
      }
    },
    handleWhenChange: ({ handleSearch, setSearchWhen }) => value => {
      setSearchWhen(value);
      handleSearch();
    },
    handleCategoryChange: ({ handleSearch, setSearchCategory }) => value => {
      setSearchCategory(value);
      handleSearch();
    },
    handleRangeChange: ({ handleSearch, selectRange }) => value => {
      selectRange(value);
      handleSearch();
    }
  }),
  withStyles(styles),
  pure
)(Component);
