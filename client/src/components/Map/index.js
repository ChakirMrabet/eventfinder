// Generic
import React from "react";
import { compose, mapProps, pure } from "recompose";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import GoogleMapReact from "google-map-react";

// Global Configuration
import config from "../../config";

// Material UI
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";

// Thunks
import { fetchEvents, selectEvent } from "../../redux/actions/events";

const style = {
  color: "red",
  width: "2em",
  height: "2em"
};

const Home = () => (
  <HomeIcon style={{ color: "green", height: "2em", width: "2em" }} />
);

const Marker = ({ clicked }) => <PlaceIcon style={style} onClick={clicked} />;

const renderMarkers = (items, selectEvent) => {
  if (items) {
    return items.map((item, i) => (
      <Marker
        key={i}
        lat={item.lat}
        lng={item.lng}
        text={item.title}
        clicked={() => selectEvent(item)}
      />
    ));
  }
  return null;
};

const Component = ({
  apiKey,
  height,
  lat,
  lng,
  events,
  fetchEvents,
  selectEvent
}) => (
  <div style={{ height, width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      center={{ lat, lng }}
      defaultZoom={10}
      //onChange={({ center: { lat, lng } }) => fetchEvents(lat, lng)}
    >
      <Home lat={lat} lng={lng} />
      {renderMarkers(events, selectEvent)}
    </GoogleMapReact>
  </div>
);

// Enchance and export
export default compose(
  mapProps(props => ({
    apiKey: config.googleMapsAPIKey,
    height: props.pageHeight
  })),
  connect(
    state => ({
      lat: state.map.currentLocation.lat,
      lng: state.map.currentLocation.lng,
      events: state.events.items
    }),
    dispatch => bindActionCreators({ fetchEvents, selectEvent }, dispatch)
  ),
  pure
)(Component);
