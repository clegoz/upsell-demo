class ExpressionEvaluator
  def initialize(event_name:, user_basket_items:)
    @event_name = event_name
    @user_basket_items = user_basket_items
  end

  def evaluate(expression)
    return false unless expression

    case expression.node_type
    when NodeTypes::NOOP
      evaluate_noop expression
    when NodeTypes::LOGICAL
      evaluate_logical expression
    when NodeTypes::COMPARISON
      evaluate_comparison expression
    end
  end

  def evaluate_noop(expression)
    true
  end

  def evaluate_logical(expression)
    case expression.op
    when LogicalOperators::AND
      return evaluate_logical_and(expression)
    when LogicalOperators::OR
      return evaluate_logical_or(expression)
    end

    false
  end

  def evaluate_logical_and(expression)
    left, right = expression.children

    evaluate(left) && evaluate(right)
  end

  def evaluate_logical_or(expression)
    left, right = expression.children

    evaluate(left) || evaluate(right)
  end

  def evaluate_comparison(expression)
    case expression.left_parameter
    when ParameterNames::EVENT
      return evaluate_comparison_event(expression)
    when ParameterNames::BASKET
      return evaluate_comparison_basket(expression)
    end

    false
  end

  def evaluate_comparison_event(expression)
    return false unless expression.op == ComparisonOperators::EQUALS

    expression.right_event_name == @event_name
  end

  def evaluate_comparison_basket(expression)
    return false unless expression.op == ComparisonOperators::CONTAINS

    @user_basket_items.include? expression.right_item_id
  end
end
