// Generic
import React from "react";
import { compose, lifecycle, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Material UI
import CssBaseLine from "@material-ui/core/CssBaseline";

// Custom Components
import { Page } from "./Site";
import Map from "./Map";

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

const InfoBox = ({ event }) => {
  if (event) {
    return (
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 50,
          backgroundColor: "white",
          zIndex: 1000,
          width: 300,
          height: 150
        }}
      >
        <p>{event.title}</p>
        <p>{event.description}</p>
      </div>
    );
  }
  return null;
};

const Component = ({ loading, currentEvent }) => (
  <CssBaseLine>
    <Page>
      <Layer visible={loading} />
      <InfoBox event={currentEvent} />
      <Map />
    </Page>
  </CssBaseLine>
);

export default compose(
  connect(
    state => ({
      lat: state.map.currentLocation.lat,
      lng: state.map.currentLocation.lng,
      when: state.times.selected,
      range: state.distances.selected,
      category: state.categories.selected,
      loading: state.events.loading,
      currentEvent: state.events.selected
    }),
    dispatch => bindActionCreators({ fetchEvents }, dispatch)
  ),
  lifecycle({
    componentDidMount() {
      const {lat, lng, when, range, category} = this.props;
      this.props.fetchEvents(lat, lng, when, range, category);
    }
  }),
  pure
)(Component);
