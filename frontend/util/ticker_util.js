export const createTicker = (ticker) => {
  return $.ajax({
    method: "POST",
    url: "/tickers",
    data: { ticker }
  });
};

export const updateTicker = (ticker) => {
  return $.ajax({
    method: "PATCH",
    url: `/tickers/${ticker.id}`,
    data: { ticker }
  });
};

export const fetchTickers = () => {
  return $.ajax({
    method: "GET",
    url: "/tickers"
  });
};