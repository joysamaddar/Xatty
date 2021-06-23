import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./containers/Home/Home";
import Chat from "./containers/Chat/Chat";
import Join from "./containers/Join/Join";
import Create from "./containers/Create/Create";

const App = ()=>(
  <Router>
    <Switch>
      <Route path="/chat" exact>{Chat}</Route>
      <Route path="/join" exact>{Join}</Route>
      <Route path="/create" exact>{Create}</Route>
      <Route path="/">{Home}</Route>
    </Switch>
  </Router>
)

export default App;