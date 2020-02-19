
  export const createTicker = (ticker) => {
    return $.ajax({
      method: "POST",
      url: "/tickers",
      data: { ticker }
    });
  };

  export const fetchTickers = () => {
    return $.ajax({
      method: "GET",
      url: "/tickers",
    });
  };
