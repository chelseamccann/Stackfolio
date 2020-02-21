import React from 'react';
import { Link } from 'react-router-dom';

export default ({ currentUser, logout }) => {

  const display = currentUser ? (
    <div>
      <Link to="/transactions" className="transactions-link">Transactions</Link>
      <Link to="/stocks" className="transactions-link">Stocks</Link>
      <button  onClick={logout}>Logout</button>
    </div>
      // <Link to="/login" className="logout-button" onClick={logout}>Logout</Link>

  ) : (
    <div>
      <Link className="btn" to="/signup">Sign Up</Link>
      <Link className="btn" to="/login">Log In</Link>
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
