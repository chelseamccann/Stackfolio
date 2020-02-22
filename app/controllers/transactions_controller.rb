class TransactionsController < ApplicationController

    before_action :ensure_logged_in

    def index
        # all transactions associated with the current user and including ticker info
        @transactions = current_user.transactions
        render json: @transactions.to_json(include: :ticker)
    end

end