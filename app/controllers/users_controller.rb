class UsersController < ApplicationController

    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.new(user_params)
        @user.buying_power ||= 5000.00
        if @user.save
            login!(@user)
            render "users/show"
        else
            debugger
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password, :buying_power)
    end

end