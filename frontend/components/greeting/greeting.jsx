import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Stock } from '../stock/stock';

export const Greeting = ({ currentUser, logout }) => (

    <header className="nav-bar">
      <div> 
        <h2>Hey</h2>
        <Link to="/"><button className="" onClick={logout}><b className="title">Log Out</b></button></Link>
        <Stock currentUser={currentUser}/>
      </div>
    </header>
    
  )