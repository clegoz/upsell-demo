require "test_helper"

class ExpressionEvaluatorTest < ActiveSupport::TestCase
  # Expected:
  #   AND (
  #     EQUALS (event, on_checkout),
  #     CONTAINS (basket, 1)
  #   )
  #
  # Actual:
  #   event: on_checkout
  #   basket: [ 1 ]
  test "should evaluate true" do
    expression_evaluator = ExpressionEvaluator.new(
      event_name: "on_checkout",
      user_basket_items: [ 1 ]
    )

    rule_expression = RuleExpression.new(
      node_type: NodeTypes::LOGICAL,
      op: LogicalOperators::AND,
      children: [
        RuleExpression.new(
          node_type: NodeTypes::COMPARISON,
          op: ComparisonOperators::EQUALS,
          left_parameter: "event",
          right_event_name: "on_checkout"
        ),
        RuleExpression.new(
          node_type: NodeTypes::COMPARISON,
          op: ComparisonOperators::CONTAINS,
          left_parameter: "basket",
          right_item_id: 1
        )
      ]
    )

    assert expression_evaluator.evaluate(rule_expression)
  end

  # Expcted:
  #   AND (
  #     EQUALS (event, on_checkout),
  #     AND (
  #       CONTAINS (basket, 1),
  #       CONTAINS (basket, 2)
  #     )
  #   )
  #
  # Actual:
  #   event: on_checkout
  #   basket: [ 1 ]
  test "should evaluate false" do
    expression_evaluator = ExpressionEvaluator.new(
      event_name: "on_checkout",
      user_basket_items: [ 1 ]
    )

    rule_expression = RuleExpression.new(
      node_type: NodeTypes::LOGICAL,
      op: LogicalOperators::AND,
      children: [
        RuleExpression.new(
          node_type: NodeTypes::COMPARISON,
          op: ComparisonOperators::EQUALS,
          left_parameter: "event",
          right_event_name: "on_checkout"
        ),
        RuleExpression.new(
          node_type: NodeTypes::LOGICAL,
          op: LogicalOperators::AND,
          children: [
            RuleExpression.new(
              node_type: NodeTypes::COMPARISON,
              op: ComparisonOperators::CONTAINS,
              left_parameter: "basket",
              right_item_id: 1
            ),
            RuleExpression.new(
              node_type: NodeTypes::COMPARISON,
              op: ComparisonOperators::CONTAINS,
              left_parameter: "basket",
              right_item_id: 2
            )
          ])
      ]
    )

    assert_not expression_evaluator.evaluate(rule_expression)
  end
end
