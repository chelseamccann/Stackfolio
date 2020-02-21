import React from 'react';
import { Link } from 'react-router-dom';
import { Stock } from '../stock/stock';
import { StockIndex } from '../stock/stock_index';

export const Greeting = () => (
    <header className="nav-bar">
      <div className="stock-container"> 

        <StockIndex />
        <Stock/>

      </div>
    </header>
  )