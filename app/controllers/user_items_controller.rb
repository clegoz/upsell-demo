class UserItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_item, only: %i[ edit update destroy ]

  def index
    @items = current_user.items
  end

  def new
  end

  def edit
  end

  def create
    @item = current_user.items.new(user_item_params)
    @item.is_listed = true

    if @item.save
      render json: { location: item_url(@item) }, status: :created
    else
      render json: { errors: @item.errors.full_messages }, status: :bad_request
    end

  end

  def update
    if @item.update(user_item_params)
      render json: { location: item_url(@item) }, status: :ok
    else
      render json: { errors: @item.errors.full_messages }, status: :bad_request
    end

  end

  def destroy
    @item.update_attribute(:is_listed, false)

    head :no_content
  end

  private
    def set_item
      @item = current_user.items.eager_load(:user).find(params[:id])
    end

    def user_item_params
      params.permit(:name, :description, :price)
    end
end
