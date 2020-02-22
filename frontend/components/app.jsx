import React from 'react';
import { Dashboard } from './dashboard/dashboard';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import {NavBar} from './nav_bar/nav_bar';
import { TransactionIndex } from './transactions/transaction_index';
import {LoginForm} from './user_auth/login_form';
import {SignupForm} from './user_auth/signup_form';
import TickerShowContainer from './ticker/ticker_show_container';

export const App = () => (
  <>
    <Route path="/" component={NavBar}/>
    <Redirect from="/" to="login" />
    <AuthRoute path="/signup" component={SignupForm} />
    <AuthRoute path="/login" component={LoginForm} />
    <Switch>
      <ProtectedRoute path="/stocks" component={Dashboard} />
      <ProtectedRoute path="/transactions" component={TransactionIndex} />
      <ProtectedRoute exact path='/:tickerSymbol' component={TickerShowContainer}/>
    </Switch>
  </>
);

