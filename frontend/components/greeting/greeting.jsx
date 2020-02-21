import React from 'react';
import { Link } from 'react-router-dom';
import { Stock } from '../stock/stock';
import { StockIndex } from '../stock/stock_index';

export const Greeting = ({ currentUser, logout }) => (

    <header className="nav-bar">
      <div> 

        <Link to="/"><button className="" onClick={logout}><b className="title">Log Out</b></button></Link>
        <Stock currentUser={currentUser}/>
        
        {/* <Link to="/stocks">Stocks</Link> */}
        <StockIndex />

        <Link to="/transactions">Transactions</Link>
      </div>
    </header>
    
  )