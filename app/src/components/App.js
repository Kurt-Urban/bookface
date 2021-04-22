import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Header from "./templates/header";

import "../css/custom.scss";

const App = () => {
  return (
    <div id="body">
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component="" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
