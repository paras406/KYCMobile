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
  AdminHome
} from './containers';
import CustomRoute from './components/CustomRoute';
import client from './apolloClient';


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
        <CustomRoute path="/adminHome">
          <AdminHome />
        </CustomRoute>
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
