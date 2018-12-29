import { combineReducers } from "redux";
import app from "./app";
import events from "./events";
import categories from "./categories";
import times from "./times";
import ranges from "./ranges";
import map from "./map";

export default combineReducers({
  app,
  map,
  events,
  times,
  ranges,
  categories
});
