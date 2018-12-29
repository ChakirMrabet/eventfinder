import axios from "axios";
import Geocode from "react-geocode";
import * as actionTypes from "../common";

import config from "../../config";

Geocode.setApiKey(config.googleMapsAPIKey);

// Fetches from the server all the available events in a given range
// from a given lat and lng that belong to the given category
export const fetchEvents = (lat, lng, when, range, category) => {
  return async dispatch => {
    // Initiate loading
    dispatch({
      type: actionTypes.FETCH_EVENTS_STARTED
    });

    try {
      const response = await axios.get(
        `/events/${lat},${lng}/${when}/${range}/${category}`
      );

      dispatch({
        type: actionTypes.FETCH_EVENTS_ENDED
      });

      dispatch({
        type: actionTypes.FETCH_EVENTS,
        payload: response.data
      });
      dispatch({
        type: actionTypes.NOTIFICATION_SET,
        payload: `${response.data.data.total} events found!`
      });
    } catch (e) {
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

// Fetches from the server all the available events in a given range
// from a given address that belong to the given category
export const searchEvent = (address, when, range, category) => {
  return async dispatch => {
    const response = await Geocode.fromAddress(address);
    if (response) {
      const { lat, lng } = response.results[0].geometry.location;
      dispatch(fetchEvents(lat, lng, when, range, category));
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

// Fetches a specific event with the given event id and sets it as
// the global selected one
export const selectEvent = eventId => {
  return async dispatch => {
    if (eventId === null) {
      dispatch({
        type: actionTypes.SELECT_EVENT,
        payload: null
      });
      return;
    }
    try {
      dispatch({
        type: actionTypes.SELECT_EVENT_STARTED
      });

      const response = await axios.get(`/events/${eventId}`);
      if (response) {
        dispatch({
          type: actionTypes.SELECT_EVENT_ENDED,
          payload: response.data.data
        });
      } else {
        dispatch({
          type: actionTypes.SEARCH_EVENT_NOT_FOUND
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};
