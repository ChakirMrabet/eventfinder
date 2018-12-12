// Generic
import React from "react";
import { compose, withState, withHandlers, pure } from "recompose";

// Custom components
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Content from "./Content";

const Component = ({ children, toggleSideBar, isSideBarOpen }) => (
  <div>
    <TopBar toggleSideBar={toggleSideBar} />
    <SideBar isOpen={isSideBarOpen} />
    <Content>{children}</Content>
  </div>
);

export default compose(
  withState("isSideBarOpen", "setSideBarOpen", false),
  withHandlers({
    toggleSideBar: ({ isSideBarOpen, setSideBarOpen }) => () =>
      setSideBarOpen(!isSideBarOpen)
  }),
  pure
)(Component);
