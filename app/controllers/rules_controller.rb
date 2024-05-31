class RulesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @rules = current_user.rules.where(is_active: true)
  end

  def new
    @items = Item.where(user_id: current_user.id)
  end

  def edit
    @rule = Rule.eager_load(:rule_expressions).find(params[:id])
    @items = Item.where(user_id: current_user.id)
  end


  def create
    ActiveRecord::Base.transaction do
      rule = current_user.rules.create!(
        name: params[:name],
        description: params[:description],
        is_active: true
      )
      create_expression_recursive(params[:expression], rule)

      rule_action_param = params[:rule_action]
      rule_action = RuleAction.new(
        method: rule_action_param[:method],
        message: rule_action_param[:message],
        item_to_added_id: rule_action_param[:item_to_added_id],
        method: rule_action_param[:method],
        rule: rule
      )
      if rule_action_param[:items_to_removed_item_ids]
        rule_action.rule_action_items_to_removeds = rule_action_param[:items_to_removed_item_ids].map { |item_id| RuleActionItemsToRemoved.new(item_id: item_id) }
      end

      rule_action.save!
    render json: { location: rules_path }
    end
  rescue ActiveRecord::RecordInvalid => exception
    render json: { errors: exception }, status: :bad_request
  end

  def update
    if current_user.rules.find(params[:id]).update(is_active: false)
      create
    end
  end

  def destroy
    current_user.rules.find(params[:id]).update(is_active: false)
  end

  private
    def create_expression_recursive(expression_param, rule)
      case expression_param[:node_type]
      when NodeTypes::NOOP
        RuleExpression.create!(
          node_type: expression_param[:node_type],
          rule: rule
        )
      when NodeTypes::LOGICAL
        rule_expression = RuleExpression.create!(
          node_type: expression_param[:node_type],
          op: expression_param[:op],
          rule: rule
        )
        left = create_expression_recursive(expression_param[:left_expression], rule)
        left.move_to_child_of(rule_expression) if left
        right = create_expression_recursive(expression_param[:right_expression], rule)
        right.move_to_child_of(rule_expression) if right

        rule_expression
      when NodeTypes::COMPARISON
        RuleExpression.create!(
          expression_param.permit(:node_type, :op, :left_parameter, :right_item_id, :right_event_name).merge(rule: rule)
        )
      end
    end
end
