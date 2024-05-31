class ItemsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @items = Item.where(is_listed: true)
  end

  def show
    @item = Item.eager_load(:user).find(params[:id])
    @is_in_basket = current_user&.basket_items&.exists?(params[:id])
  end
end
