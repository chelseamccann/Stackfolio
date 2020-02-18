import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

// const mapStateToProps = state => {
//     let userId = state.session.id;
//     return { loggedIn: Boolean(state.entities.users[userId]) }
// };

// const mapStateToProps = state => ({
//     loggedIn: Boolean(state.session.currentUser),
//   });

const mapStateToProps = state => {

    debugger
    return { loggedIn: Boolean(state.session.id) }
};

const Auth = ({ loggedIn, path, component: Component }) => (
    <Route 
        path={path}
        render={props => (
            loggedIn ? <Redirect to="/" /> : <Component {...props} />
        )}
    />
);

const Protected = ({ loggedIn, path, component: Component }) => (
    <Route 
        path={path}
        render={props => (
            loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
        )}
    />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps, undefined)(Protected));