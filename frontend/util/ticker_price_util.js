
export const fetchPrice = (ticker) => {
    return $.ajax({
        method: "GET", 
        // url: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${ENV["MY_API_KEY"]}`,
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=${ENV["MY_API_KEY"]}`,
    })
}

export const fetchOpenPrice = (ticker) => {
    return $.ajax({
        method: "GET", 
        // url: `https://cloud.iexapis.com/stable/stock/${ticker}/ohlc?token=pk_b6f890a95fb24dbfb1a85f362fe5687f`,
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/ohlc?token=${ENV["MY_API_KEY"]}`,
    })
}

export const fetchPrices = ticker => {
    return $.ajax({
        method: "GET",
        // url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${ENV["MY_API_KEY"]}`
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${ENV["MY_API_KEY"]}`
        
    })
}