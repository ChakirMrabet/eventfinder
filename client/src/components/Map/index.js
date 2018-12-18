// Generic
import React from "react";
import { compose, mapProps, pure } from "recompose";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import GoogleMapReact from "google-map-react";

// Global Configuration
import config from "../../config";

// Thunks
import { setZoom } from "../../redux/actions/map";
import { fetchEvents, selectEvent } from "../../redux/actions/events";

// Custom Components
import TargetMarker from "./TargetIcon";
import EventMarker from "./EventIcon" ;
import Range from "./Range";

// Map style
import mapTheme from "./mapTheme";

const renderMarkers = (items, selectedEvent, selectEvent) => {
  const selectedEventId = selectedEvent ? selectedEvent.id : null;

  if (items) {
    return items.map((item, i) => (
      <EventMarker
        key={i}
        lat={item.lat}
        lng={item.lng}
        text={item.title}
        selected={selectedEventId === item.id}
        onClick={() => selectEvent(item)}
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
  zoom,
  events,
  range,
  setZoom,
  fetchEvents,
  selectEvent,
  selectedEvent
}) => (
  <div style={{ height, width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      center={{ lat, lng }}
      zoom={zoom}
      onChange={({ center: { lat, lng }, zoom }) => {
        //fetchEvents(lat, lng);
        selectEvent(null);
        setZoom(zoom);
      }}
      options={() => ({
        styles: mapTheme
      })}
    >
      <Range lat={lat} lng={lng} zoom={zoom} range={range} />
      <TargetMarker lat={lat} lng={lng} />
      {renderMarkers(events, selectedEvent, selectEvent)}
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
      zoom: state.map.currentZoom,
      events: state.events.items,
      selectedEvent: state.events.selected,
      range: state.ranges.selected
    }),
    dispatch =>
      bindActionCreators({ setZoom, fetchEvents, selectEvent }, dispatch)
  ),
  pure
)(Component);
