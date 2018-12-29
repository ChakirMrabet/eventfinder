// Generic
import React from "react";
import { compose, lifecycle, pure } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Material UI
import CssBaseLine from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

// Custom Components
import Notification from "./Notification";
import TrackingLayer from "./TrackingLayer";
import LoadingLayer from "./LoadingLayer";
import { Page } from "../Site";
import MapComponent from "../Map";

// Custom theme
import theme from "../themes";

// Actions
import { getCurrentLocation, resetNotification } from "../../redux/actions/app";
import { fetchEvents } from "../../redux/actions/events";

const Component = ({
  notificationText,
  tracking,
  loading,
  resetNotification
}) => (
  <CssBaseLine>
    <MuiThemeProvider theme={theme}>
      <Page>
        <Notification text={notificationText} onClose={resetNotification} />
        <TrackingLayer open={tracking} />
        <LoadingLayer visible={loading} />
        <MapComponent />
      </Page>
    </MuiThemeProvider>
  </CssBaseLine>
);

export default compose(
  connect(
    ({ app, events }) => ({
      notificationText: app.notificationText,
      tracking: app.tracking,
      loading: events.loading
    }),
    dispatch =>
      bindActionCreators(
        { getCurrentLocation, resetNotification, fetchEvents },
        dispatch
      )
  ),
  lifecycle({
    componentDidMount() {
      this.props.getCurrentLocation();
    }
  }),
  pure
)(Component);
