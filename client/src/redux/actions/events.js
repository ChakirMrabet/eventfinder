import axios from "axios";
import Geocode from "react-geocode";
import * as actionTypes from "../common";

import config from "../../config";

Geocode.setApiKey(config.googleMapsAPIKey);

export const fetchEvents = (lat, lng, when, range, category) => {
  return async (dispatch, getState) => {
    const { map, times, distances, categories } = getState();

    // Initiate loading
    dispatch({
      type: actionTypes.FETCHING_EVENTS
    });

    try {
      const response = await axios.get(
        `/events/${map.currentLocation.lat},${map.currentLocation.lng}/${
          times.selected
        }/${distances.selected}/${categories.selected}`
      );

      dispatch({
        type: actionTypes.FETCH_EVENTS,
        payload: response.data
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_EVENTS,
        payload: {
          data: {
            total: 0,
            items: []
          }
        }
      });
    }
  };
};

export const selectEvent = event => {
  return dispatch => {
    dispatch({
      type: actionTypes.SELECT_EVENT,
      payload: event
    });
  };
};

export const searchEvent = (address, when, range) => {
  return async dispatch => {
    const response = await Geocode.fromAddress(address);
    if (response) {
      const { lat, lng } = response.results[0].geometry.location;
      dispatch(fetchEvents(lat, lng, when, range));
      dispatch({
        type: actionTypes.MAP_CENTER_CHANGED,
        payload: { lat, lng }
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH_EVENT_NOT_FOUND
      });
    }
  };
};
