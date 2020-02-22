
export const fetchPrice = ticker => {
    return $.ajax({
        method: "GET", 
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=pk_e32159988e5d4975aa0fd513e43d76f9`
    })
}

export const fetchDailyPrices = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=pk_e32159988e5d4975aa0fd513e43d76f9`
    })
}

export const fetchPrices = (symbol, timeFrame) => {
    return $.ajax({
        method: "GET", 
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeFrame}?chartIEXOnly=true&token=pk_e32159988e5d4975aa0fd513e43d76f9`
    })
}