class SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email],params[:user][:password])
        if @user
            login!(@user)
            render 'users/show'
        else
            render json: ['Unable to log in with provided credentials.'], status: 422
        end
    end

    def show
        @user = current_user
        render json: @user
    end

    def destroy
        if current_user
            logout!
            render json: {}
        else
            render json: ['No one is logged in!'], status: 404
        end
    end

end