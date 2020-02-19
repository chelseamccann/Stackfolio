class TickersController < ApplicationController

    def create
        new_ticker = Ticker.new(ticker_params)
        existing_ticker = Ticker.find_by_symbol(@ticker.symbol)
        debugger
        binding.pry
        if !existing_ticker.nil?
            existing_shares = existing_ticker.shares
            debugger
            existing_ticker.update_attributes(:shares => existing_shares + ticker.shares)
            debugger
            @ticker = existing_ticker
            render "tickers/show"
        elsif new_ticker.save
            @ticker = new_ticker
            render "tickers/show"
        else
            render json: @ticker.errors.full_messages, status: 422
        end
    end

    private
    def ticker_params
        params.require(:ticker).permit(:symbol, :shares)
    end

end