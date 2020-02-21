@tickers.each do |ticker|
    json.set! ticker.id do
        json.partial! 'tickers/ticker', ticker: ticker
    end
end