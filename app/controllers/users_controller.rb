class UsersController < ApplicationController

    def create
        @user = User.new(user_params)
        @user.buying_power ||= 5000.00
        if @user.save
            login!(@user)
            render "users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :buying_power)
    end

end