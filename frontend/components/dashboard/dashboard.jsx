import React, { useEffect, useState } from 'react';
import { fetchTickers } from '../../actions/ticker_actions';
import { Portfolio } from '../stock/portfolio';
import { PortfolioIndex } from '../stock/portfolio_index';
import { useDispatch, useSelector } from "react-redux";

export const Dashboard = () => {
  const tickers = useSelector(state => Object.values(state.entities.tickers))
  const dispatch = useDispatch();

  // fetch all tickers to send down as props
  useEffect(() => {
    dispatch(fetchTickers())
  }, [])

  return(
    <header className="nav-bar">
      <div className="stock-container"> 

        <PortfolioIndex tickers={tickers} />
        <Portfolio tickers={tickers} />

      </div>
    </header>
  )
}