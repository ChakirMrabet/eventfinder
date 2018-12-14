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

// Custom Components
import Target from './TargetIcon';

const style = {
  color: "red",
  width: "2em",
  height: "2em"
};

const mapStyles = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#a7a7a7"
      },
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#737373"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#efefef"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#696969"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d6d6d6"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#b3b3b3"
      },
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff"
      },
      {
        visibility: "on"
      },
      {
        weight: 1.8
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d7d7d7"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        color: "#808080"
      },
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#d3d3d3"
      }
    ]
  }
];



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
      options={() => ({
        styles: mapStyles
      })}
    >
      <Target lat={lat} lng={lng} />
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
