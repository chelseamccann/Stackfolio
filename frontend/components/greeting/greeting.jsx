import React from 'react';
import { Route, Link } from 'react-router-dom';

export const Greeting = ({ currentUser, logout }) => {

  const dashboard = () => {
    return <div></div>
  }

  const splash_page = () => {
    return (
      <div>
        <Link to="/"><button className="" onClick={this.props.logout}><b className="title">Log Out</b></button></Link>
      </div>
    )
  }

  return (
    <header className="nav-bar">
      <div> 
        <h2>Hey</h2>
        <Link to="/"><button className="" onClick={logout}><b className="title">Log Out</b></button></Link>
        {/* {currentUser ? dashboard() : splash_page() } */}
      </div>
    </header>
  )
}