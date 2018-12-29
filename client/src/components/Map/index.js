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
import EventMarker from "./EventIcon";

// Map style
import mapTheme from "./mapTheme";

const renderMarkers = (items, selectedEvent, selectEvent) => {
  const selectedEventId = selectedEvent ? selectedEvent.id : null;

  if (items) {
    return items.map(item => {
      const categories = item.categories.category;
      const categoryValue = categories.length ? categories[0].id : "";

      return (
        <EventMarker
          key={item.id}
          lat={item.lat}
          lng={item.lng}
          id={item.id}
          text={item.title}
          categoryValue={categoryValue}
          free={item.free}
          selected={selectedEventId === item.id}
          onClick={() => selectEvent(item.id)}
        />
      );
    });
  }
  return null;
};

// Adds a circle object to the map that will represent the range
// of the search
const handleApiLoaded = (map, maps, lat, lng, range) => {
  window.mapCircle = new maps.Circle({
    strokeColor: "#46d5f7",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#aaaaaa",
    fillOpacity: 0.2,
    map: map,
    center: { lat, lng },
    // radius is expected by Google in meters
    radius: range * 1.60934 * 1000
  });
};

// Map component definition
const Component = ({
  apiKey,
  height,
  lat,
  lng,
  zoom,
  events,
  range,
  setZoom,
  selectEvent,
  selectedEvent
}) => (
  <div style={{ height, width: "100%" }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      center={{ lat, lng }}
      zoom={zoom}
      onChange={({ zoom }) => {
        // TODO: add code here for auto-search while map is moving
        selectEvent(null);
        setZoom(zoom);
        if (window.mapCircle) {
          window.mapCircle.setCenter({ lat, lng });
          window.mapCircle.setRadius(range * 1.60934 * 1000);
        }
      }}
      options={() => ({
        styles: mapTheme
      })}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) =>
        handleApiLoaded(map, maps, lat, lng, range)
      }
    >
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
