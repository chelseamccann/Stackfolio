import React, { useEffect, useState } from 'react';
import { fetchTickers } from '../../actions/ticker_actions';
import { Portfolio } from '../portfolio/portfolio';
import { PortfolioIndex } from '../portfolio/portfolio_index';
import { useDispatch, useSelector } from "react-redux";

export const Dashboard = () => {
  const tickers = useSelector(state => Object.values(state.entities.tickers))
  const dispatch = useDispatch();

  // fetch all tickers to send down as props
  useEffect(() => {
    dispatch(fetchTickers())
  }, [])

  const formatMoney = (money) => parseFloat(money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

  return(
    <header className="nav-bar">
      <div className="stock-container"> 

        <PortfolioIndex tickers={tickers} formatMoney={formatMoney}/>
        <Portfolio tickers={tickers} formatMoney={formatMoney}/>

      </div>
    </header>
  )
}