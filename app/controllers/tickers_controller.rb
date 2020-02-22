class TickersController < ApplicationController
    before_action :ensure_logged_in

    def create
        # If not enough buying power
        if new_buying_power < 0
            render json: { error: 'Not enough buying power.' }, status: 422

        # If there is enough buying power to execute buy
        else
            @ticker = current_user.tickers.build(ticker_params)
            @ticker.save

            current_user.update(buying_power: new_buying_power)
            create_transaction(@ticker, true)

            render json: @ticker, status: 200
        end
    end

    def index
        # all tickers associated with the cuurent user
        @tickers = current_user.tickers
        render json: @tickers
    end

    def show
        # all tickers associated with the cuurent user, filtered by the provided symbol from params
        @ticker = current_user.tickers.where(symbol: ticker_params[:symbol])
        render json: @ticker
    end

    def update
        # If SELL and enough shares are held
        if ticker_params[:value].to_f < 0 and existing_ticker.shares + ticker_params[:shares].to_f >= 0
            updated_value = updated_shares * transaction_price
            existing_ticker.update_attributes(shares: updated_shares, value: updated_value)
            current_user.update(buying_power: new_buying_power)
            create_transaction(existing_ticker, false)

            render json: existing_ticker

        # If SELL and enough shares are NOT held
        elsif ticker_params[:value].to_f < 0
            render json: { error: 'You do not own ' + (ticker_params[:shares].to_i*-1).to_s + ' shares of ' + ticker_params[:symbol] + '.' }, status: 422
            
        # If BUY and not enough buying power
        elsif new_buying_power < 0
            render json: { error: 'Not enough buying power.' }, status: 422

        # If BUY and enough buying power to execute
        else
            updated_value = updated_shares * transaction_price
            existing_ticker.update_attributes(shares: updated_shares, value: updated_value)

            current_user.update(buying_power: new_buying_power)
            create_transaction(existing_ticker, true)

            render json: existing_ticker
        end
    end


    private
    def ticker_params
        params.require(:ticker).permit(:symbol, :shares, :value)
    end

    ## Helper methods ##
    ####################
    def create_transaction(ticker, buy)
        current_user.transactions.create(buy: buy, price: transaction_price, ticker_id: ticker.id, shares: ticker_params[:shares])
    end

    def existing_ticker
        current_user.tickers.find_by_symbol(ticker_params[:symbol])
    end

    def transaction_price
        ticker_params[:value].to_f / ticker_params[:shares].to_f
    end

    def updated_shares
        existing_ticker.shares + ticker_params[:shares].to_i
    end

    def new_buying_power
        current_user.buying_power - ticker_params[:value].to_f
    end
    ####################
    ## Helper methods ##
end