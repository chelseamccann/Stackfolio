import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../actions/session_actions';

export const NavBar = () => {
  
  const currentUser = useSelector(state => state.session.id)
  const dispatch = useDispatch();

  // If current user exists, show transactions and stocks links
  const display = currentUser ? (
    <div>
      <div className="nav-links">
        <Link to="/transactions" className="transactions-link">Transactions</Link>
        <Link to="/stocks" className="transactions-link">Stocks</Link>
        <p className="transactions-link logout-btn" onClick={() => dispatch(logoutUser())}>Logout</p>
      </div>
    </div>
  ) : (
    <div className="nav-links"></div>
  );


  return (
    <header className="nav">
      <h1 className="logo">Stackfolio</h1>
      <div>
        {display}
      </div>
    </header>
  )
}