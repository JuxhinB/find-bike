import { Route, Switch } from "react-router-dom";
import container from "../container";

function GuestNavigation() {
  return (
    <Switch>
      <Route exact path="/" component={container.BikesLocationScreen} />
      <Route exact path="/home" component={container.BikesLocationScreen} />
      <Route component={container.NotFoundScreen} />
    </Switch>
  );
}

export default GuestNavigation;
