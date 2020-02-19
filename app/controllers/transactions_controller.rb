class TransactionsController < ApplicationController

    def create
        symbol = transaction_params[:symbol]
        shares = transaction_params[:shares].to_i
        
        ticker = Ticker.find_by_symbol(symbol) || Ticker.create(symbol: transaction_params[:symbol], shares: transaction_params[:shares])
        ticker.update_attributes(shares: ticker.shares + shares)
        
        @transaction = Transaction.new(ticker_id: ticker.id, user_id: transaction_params[:user_id])

        if @transaction.save
            render "transactions/show"
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    private
    def transaction_params
        params.require(:transaction).permit(:symbol, :price, :shares, :user_id)
    end

end