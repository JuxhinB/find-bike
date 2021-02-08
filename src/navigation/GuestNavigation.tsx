import React from "react";
import { Route, Switch } from "react-router-dom";
import { RegisterScreen } from "../container/register";

interface GuestNavigationProps {}

function GuestNavigation() {
  return (
    <Switch>
      <Route exact path="/" component={RegisterScreen} />
      <Route exact path="/register" component={RegisterScreen} />
    </Switch>
  );
}

export default GuestNavigation;
