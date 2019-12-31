import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterView from "../views/RegisterView";
import LoginView from "../views/LoginView";
import ProfileView from "../views/ProfileView";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterView} />
        <Route path="/login" component={LoginView} />
        <Route path="/profile" component={ProfileView} />
      </Switch>
    </Router>
  );
}
