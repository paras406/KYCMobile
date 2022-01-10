import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../utils/AuthenticateService';

const CustomRoute = ({ children, ...rest }) => {
     return (
          <Route
               {...rest}
               render={({ location }) => {
                    return AuthenticationService.isAuthenticated() ?
                         (children) :
                         (
                              <Redirect
                                   to={{
                                        pathname: '/login',
                                        state: { from: location },
                                   }}
                              />
                         )
                              }   
               }
          />
     );
}

export default CustomRoute;