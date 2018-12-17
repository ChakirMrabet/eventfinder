import React from "react";
import { compose, withProps, pure } from "recompose";

// JS styles (expects the radius as argument)
const styles = radius => ({
  root: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius * 2,
    backgroundColor: "#00ee00",
    opacity: 0.08,
    zIndex: 500,
    marginLeft: -radius,
    marginTop: -radius
  }
});

// This function converts distance (miles) to pixels
const convert = (zoom, lat) => {
  const circumference = 40075040;
  const scale = (circumference * Math.cos(lat)) / Math.pow(2, zoom + 8);
  return Number(scale.toFixed(2));
};

// Component definition
const Component = ({ radius }) => <div style={styles(radius).root} />;

// Enhance and export
export default compose(
  withProps(({ lat, zoom, range }) => ({
    radius: (range * 1.6 * 1000) / convert(zoom, lat)
  })),
  pure
)(Component);
