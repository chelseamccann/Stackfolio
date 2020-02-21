import React from 'react';
import { Dashboard } from './dashboard/dashboard';
import LoginFormContainer from './login_form/login_form_container';
import SignupFormContainer from './signup_form/signup_form_container';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import NavBarContainer from './nav_bar/nav_bar_container';
import { TransactionIndex } from './transactions/transaction_index';

export const App = () => (
  <>
    <Route path="/" component={NavBarContainer}/>
    <AuthRoute path="/signup" component={SignupFormContainer} />
    <AuthRoute path="/login" component={LoginFormContainer} />
    <ProtectedRoute path="/stocks" component={Dashboard} />
    <ProtectedRoute path="/transactions" component={TransactionIndex} />
  </>
);

