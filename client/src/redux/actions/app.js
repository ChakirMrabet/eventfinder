import Geocode from "react-geocode";
import config from "../../config";

import * as actionTypes from "../common";

import { fetchEvents } from "./events";

Geocode.setApiKey(config.googleMapsAPIKey);

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const getCurrentLocation = () => {
  return async dispatch => {
    // Show loader
    dispatch({
      type: actionTypes.GETTING_CURRENT_LOCATION_START
    });

    // Default location
    let currentLocation = config.defaultLocation;
    let currentAddress = config.defaultAddress;

    try {
      const position = await getCurrentPosition();
      currentLocation.lat = position.coords.latitude;
      currentLocation.lng = position.coords.longitude;
    } catch (e) {}

    // Geocode location here
    try {
      const address = await Geocode.fromLatLng(
        currentLocation.lat,
        currentLocation.lng
      );

      currentAddress = address.results[0].formatted_address;
    } catch (e) {}

    // Dispatch

    dispatch({
      type: actionTypes.CURRENT_LOCATION,
      payload: {
        currentLocation,
        currentAddress
      }
    });

    // Hide loader
    dispatch({
      type: actionTypes.GETTING_CURRENT_LOCATION_END
    });

    // Search current location
    dispatch(
      fetchEvents(currentLocation.lat, currentLocation.lng, "today", 15, "all")
    );
  };
};

export const resetNotification = () => ({
  type: actionTypes.NOTIFICATION_REMOVE
});
