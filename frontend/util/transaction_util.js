export const createTransaction = (transaction) => {
    return $.ajax({
      method: "POST",
      url: "/transactions",
      data: { transaction }
    });
  };
  
  export const fetchTransactions = (transactions) => {
    return $.ajax({
      method: "GET",
      url: "/transactions",
      data: { transactions }
    });
  };

  export const createTicker = (symbol, shares) => {
    return $.ajax({
      method: "POST",
      url: "/tickers",
      data: { symbol, shares, user }
    });
  };