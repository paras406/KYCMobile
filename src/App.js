import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ApolloProvider,
} from "@apollo/client";

import {
  Login,
  MobileOTP,
  UserScreen,
} from './containers';
import CustomRoute from './components/CustomRoute';
import client from './apolloClient';

import './App.css';
import './assets/fonts/fonts.css';


const StackNavigator = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/mobileOTP">
          <MobileOTP />
        </Route>
        <Route path="/users">
          <UserScreen />
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <StackNavigator />
    </ApolloProvider>
  );
}

export default App;
