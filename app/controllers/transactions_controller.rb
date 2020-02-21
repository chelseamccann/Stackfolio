class TransactionsController < ApplicationController

    before_action :ensure_logged_in

    def index
        @transactions = current_user.transactions
        render json: @transactions.to_json(include: :ticker)
    end

end