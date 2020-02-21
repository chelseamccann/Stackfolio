class TickersController < ApplicationController

    # run prior to executing method
    before_action :ensure_logged_in, only: [:new, :edit, :update, :create, :destroy]

    def create
        @ticker = current_user.tickers.build(ticker_params)
        @ticker.save

        transaction_price = ticker_params[:value].to_f / ticker_params[:shares].to_f
        transaction = current_user.transactions.build(buy: true, price: transaction_price, ticker_id: @ticker.id)
        transaction.save

        render json: @ticker
    end

    def index
        debugger
        @tickers = current_user.tickers
        debugger
        render json: @tickers
    end

    def show
        @ticker = current_user.tickers.where(symbol: ticker_params[:symbol])
        render json: @ticker
    end

    def update
        @existing_ticker = current_user.tickers.find_by_symbol(ticker_params[:symbol])
        debugger
        updated_shares = @existing_ticker.shares + ticker_params[:shares].to_i
        updated_value = @existing_ticker.value + ticker_params[:value].to_f
        @existing_ticker.update_attributes(shares: updated_shares, value: updated_value)
        transaction_price = ticker_params[:value].to_f / ticker_params[:shares].to_f
        transaction = current_user.transactions.build(buy: true, price: transaction_price, ticker_id: @existing_ticker.id)
        transaction.save
        # if current_user.update_attributes(user_params)
        #   render "api/users/show"
        # else
        #   render json: @user.errors.full_messages, status: 422
        # end
        render json: @existing_ticker
    end

    private
    def ticker_params
        params.require(:ticker).permit(:symbol, :shares, :value)
    end

end