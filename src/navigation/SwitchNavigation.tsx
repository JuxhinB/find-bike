import React from "react";
import { GuestNavigation } from ".";
import { BrowserRouter } from "react-router-dom";

interface SwitchNavigationProps {}

function SwitchNavigation() {
  return (
    <BrowserRouter>
      <GuestNavigation />
    </BrowserRouter>
  );
}

export default SwitchNavigation;
