import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout }) => {

  const display = currentUser ? (
    <div className="nav-links">
      <Link to="/transactions" className="transactions-link">Transactions</Link>
      <Link to="/stocks" className="transactions-link">Stocks</Link>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>

  ) : (
    <div className="nav-links">
      {/* <Link className="btn" to="/signup">Sign Up</Link>
      <Link className="btn" to="/login">Log In</Link> */}
    </div>
  );


  return (
    <header className="nav">
      <h1 className="logo">Stockfolio</h1>
      <div>
        {display}
      </div>
    </header>
  )

  
}
