class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    return render :new, status: :ok
  end

  def create
    user = User.find_by(username: params[:username])
    if user && user&.authenticate(params[:password])
      session[:user_id] = user.id
      head :no_content
    else
      render json: { error: "Invalid username or password" }, status: :bad_request
    end


  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
