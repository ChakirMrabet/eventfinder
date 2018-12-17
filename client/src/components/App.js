// Generic
import React from "react";
import { compose, lifecycle, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Material UI
import CssBaseLine from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

// Custom Components
import { Page } from "./Site";
import Map from "./Map";
import InfoBox from "./InfoBox";

// Custom theme
import theme from "./themes";

// Actions
import { fetchEvents } from "../redux/actions/events";

const Layer = ({ pageHeight, visible }) => {
  if (visible) {
    return (
      <div
        style={{
          width: "100%",
          height: pageHeight,
          opacity: 0.5,
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "#aaaaaa"
        }}
      />
    );
  }
  return null;
};

const Component = ({ loading, currentEvent }) => (
  <CssBaseLine>
    <MuiThemeProvider theme={theme}>
      <Page>
        <Layer visible={loading} />
        <InfoBox event={currentEvent} />
        <Map />
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
