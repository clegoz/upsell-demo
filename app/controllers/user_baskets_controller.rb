class UserBasketsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @basket = current_user.user_baskets.eager_load(:item)

    expression_evaluator = ExpressionEvaluator.new(
      event_name: "on_checkout",
      user_basket_items: current_user.user_baskets.map(&:item_id)
    )

    rules = Rule.eager_load(:rule_expressions)
              .where(user_id: @basket.map { |basket_item| basket_item.item.user_id },
                     is_active: true)

    @actions = rules.filter_map do |rule|
      rule.rule_action if expression_evaluator.evaluate(rule.rule_expressions.root)
    end

    render :index, status: :ok
  end

  def apply
    ActiveRecord::Base.transaction do
      current_user.user_baskets.where(item_id: params[:items_to_removed_item_ids]).destroy_all
      current_user.user_baskets.create(item_id: params[:item_to_added_id])
    end

    head :no_content
  end

  def create
    basket_item = current_user.user_baskets.create(item_id: params[:item_id])

    render json: basket_item
  end

  def destroy
    current_user.user_baskets.where(item_id: params[:item_id]).destroy_all
  end
end
