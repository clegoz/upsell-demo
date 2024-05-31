class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    render :new, status: :ok
  end

  def create
    user = User.new(user_params)

    if user.save
      head :no_content
    else
      render json: { errors: user.errors.full_messages }, status: :bad_request
    end
  end

  private
    def user_params
      params.permit(:username, :password, :name, :bio)
    end
end
