class OrdersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_items, only: %i[ new create ]

  def index
    @orders = current_user.orders.eager_load(order_items: [ :item ])
  end

  def show
    @order = current_user.orders.eager_load(order_items: [ :item ]).find(params[:id])
  end

  def new
  end

  def create
    ActiveRecord::Base.transaction do
      order = current_user.orders.create(
        order_items: @items.map {|item| OrderItem.new(item_id: item.id, price: item.price)}
      )
      UserBasket.where(user_id: current_user.id).destroy_all

      return render json: { location: order_url(order) }, status: :created
    end
  end

  private
    def set_items
      @items = current_user.basket_items
    end
end
