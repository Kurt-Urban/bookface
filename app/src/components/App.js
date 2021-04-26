import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Header from "./templates/header";

import "../css/custom.scss";
import { authenticate } from "../reduxStore/auth";
import { connect } from "react-redux";

const App = ({ authenticate }) => {
  useEffect(() => {
    authenticate();
  }, []);
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

export default connect(null, { authenticate })(App);
