import React from 'react';
import { connect } from 'react-redux';
import TickerShow from './ticker_show';

const mapStateToProps = (state, ownProps) => {

  let userId = state.session.id;
  let tickerSymbol = ownProps.tickerSymbol || ownProps.match.params.tickerSymbol 

  return {
    tickerSymbol: tickerSymbol,
    currentUser: state.entities.users[userId],
    currentBuyingPower: state.entities.users[userId].buying_power,
  }

}

export default connect(mapStateToProps, null)(TickerShow);