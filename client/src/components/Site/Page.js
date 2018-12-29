// Generic
import React from "react";
import { connect } from "react-redux";
import { compose, withState, withHandlers, pure } from "recompose";

// Custom components
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import InfoBar from "./InfoBar";
import Content from "./Content";

const Component = ({
  children,
  isSideBarOpen,
  isInfoBarOpen,
  isInfoBarLoading,
  selectedEvent,
  toggleSideBar
}) => (
  <div>
    <TopBar toggleSideBar={toggleSideBar} />
    <SideBar isOpen={isSideBarOpen} />
    <InfoBar
      open={isInfoBarOpen}
      loading={isInfoBarLoading}
      event={selectedEvent}
    />
    <Content>{children}</Content>
  </div>
);

export default compose(
  withState("isSideBarOpen", "setSideBarOpen", false),
  withHandlers({
    toggleSideBar: ({ isSideBarOpen, setSideBarOpen }) => () =>
      setSideBarOpen(!isSideBarOpen)
  }),
  connect(({ events }) => ({
    isInfoBarOpen: events.infoBarOpen,
    isInfoBarLoading: events.isInfoBarLoading,
    selectedEvent: events.selected
  })),
  pure
)(Component);
