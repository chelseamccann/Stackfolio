class TickersController < ApplicationController

    # run prior to executing method
    before_action :ensure_logged_in, only: [:new, :edit, :update, :create, :destroy]

    def create
        symbol = ticker_params[:symbol]

        existing_ticker = current_user.tickers.find_by_symbol(symbol)
        @ticker = current_user.tickers.new(ticker_params)

        if existing_ticker.nil?
            @ticker.save
        else
            debugger
            existing_ticker.update_attributes(shares: existing_ticker.shares + ticker_params[:shares].to_i, value: existing_ticker.value + ticker_params[:value].to_f)
        end

        transaction_price = ticker_params[:value].to_f / ticker_params[:shares].to_f
        ticker_id = @ticker.id || existing_ticker.id
        transaction = Transaction.new(buy: true, price: transaction_price, ticker_id: ticker_id, user_id: current_user.id)
        transaction.save


        # if save
        #     render "tickers/show"
        # else
        #     render json: @ticker.errors.full_messages, status: 422
        # end

    end

    private
    def ticker_params
        params.require(:ticker).permit(:symbol, :shares, :value)
    end

end