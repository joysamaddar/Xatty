import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {createStore, combineReducers} from 'redux';
import { Provider } from "react-redux";

import Home from "./containers/Home/Home";
import Chat from "./containers/Chat/Chat";
import Join from "./containers/Join/Join";
import Create from "./containers/Create/Create";
import userReducer from "./store/reducers/user";
import errorReducer from "./store/reducers/error";
import Error from "./components/Error/Error";

const App = ()=>{

  const rootReducer = combineReducers({user: userReducer, error: errorReducer});
  const store = createStore(rootReducer);
  return(
    <Provider store={store}>  
      <Error/>
      <Router>
        <Switch>
          <Route path="/chat" exact component={Chat}></Route>
          <Route path="/join" exact component={Join}></Route>
          <Route path="/create" exact component={Create}></Route>
          <Route path="/">{Home}</Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;