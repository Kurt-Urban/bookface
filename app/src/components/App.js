import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

import Dashboard from "./areas/dashboard";
import SignIn from "./areas/signIn";
import Spinner from "./templates/loadingScreen";

import "../css/custom.scss";
import { authenticate } from "../reduxStore/auth";
import { connect } from "react-redux";

const App = ({ authenticate, isAuthenticated }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    async function loadContent() {
      await authenticate();
    }
    loadContent();
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div id="body" className="bg-light">
        <Spinner />
      </div>
    );
  } else if (isAuthenticated) {
    return (
      <div id="body" className="bg-light">
        <Router history={history}>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/profile" exact component="" />
          </Switch>
        </Router>
      </div>
    );
  } else if (!isAuthenticated) {
    return (
      <div id="body">
        <SignIn />
      </div>
    );
  }
};

export default connect(
  (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  },
  { authenticate }
)(App);
