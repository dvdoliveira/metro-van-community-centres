class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to centres_path, notice: "Welcome back, #{user.firstname}!"
    else
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :back, notice: "See you soon!"
  end


end
