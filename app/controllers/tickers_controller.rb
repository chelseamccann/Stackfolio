class TickersController < ApplicationController

    # run prior to executing method
    before_action :ensure_logged_in, only: [:new, :edit, :update, :create, :destroy]

    def create
        symbol = ticker_params[:symbol]

        existing_ticker = current_user.tickers.find_by_symbol(symbol)
        @ticker = current_user.tickers.build(ticker_params)
        existing_ticker.nil? ? @ticker.save : existing_ticker.update_attributes(shares: existing_ticker.shares + ticker_params[:shares].to_i, value: existing_ticker.value + ticker_params[:value].to_f)

        transaction_price = ticker_params[:value].to_f / ticker_params[:shares].to_f
        ticker_id = @ticker.id || existing_ticker.id
        transaction = current_user.transactions.build(buy: true, price: transaction_price, ticker_id: ticker_id)
        transaction.save
    end

    def index
        @tickers = current_user.tickers
        render json: @tickers
    end

    def show
        @ticker = current_user.tickers.where(symbol: ticker_params[:symbol])
        render json: @ticker
    end

    private
    def ticker_params
        params.require(:ticker).permit(:symbol, :shares, :value)
    end

end