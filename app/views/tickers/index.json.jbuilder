@tickers.each do |ticker|
    json.set! ticker.id do
        json.extract! ticker, :symbol, :id, :shares
    end
end