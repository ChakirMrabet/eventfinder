// Generic
import React from "react";
import { compose, lifecycle, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Material UI
import CssBaseLine from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

// Custom Components
import LoadingLayer from "./LoadingLayer";
import { Page } from "../Site";
import MapComponent from "../Map";
import InfoBox from "../InfoBox";

// Custom theme
import theme from "../themes";

// Actions
import { fetchEvents } from "../../redux/actions/events";

const Component = ({ loading, currentEvent }) => (
  <CssBaseLine>
    <MuiThemeProvider theme={theme}>
      <Page>
        <LoadingLayer visible={loading} />
        <InfoBox event={currentEvent} />
        <MapComponent />
      </Page>
    </MuiThemeProvider>
  </CssBaseLine>
);

export default compose(
  connect(
    state => ({
      lat: state.map.currentLocation.lat,
      lng: state.map.currentLocation.lng,
      when: state.times.selected,
      range: state.ranges.selected,
      category: state.categories.selected,
      loading: state.events.loading,
      currentEvent: state.events.selected
    }),
    dispatch => bindActionCreators({ fetchEvents }, dispatch)
  ),
  lifecycle({
    componentDidMount() {
      const { lat, lng, when, range, category } = this.props;
      this.props.fetchEvents(lat, lng, when, range, category);
    }
  }),
  pure
)(Component);
