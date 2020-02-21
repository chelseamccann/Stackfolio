import React from 'react';
import { logoutUser } from '../../actions/session_actions';
import { Greeting } from './greeting';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
  let user = state.session.currentUser;
  debugger
  return { currentUser: state.entities.users[user] }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);