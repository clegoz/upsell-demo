json.(expression, :id, :node_type, :op, :left_parameter, :right_item_id, :right_event_name)
json.left_expression { json.partial! 'rule_expression', expression: expression.descendants[0] if expression.descendants[0] }
json.right_expression { json.partial! 'rule_expression', expression: expression.descendants[1] if expression.descendants[1] }
