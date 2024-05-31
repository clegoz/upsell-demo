if @rule
  json.rule do
    json.(@rule, :id, :name, :description)
    json.expression { json.partial! 'rule_expression', expression: @rule.rule_expressions.root }
    json.rule_action do
      json.(@rule.rule_action, :method, :message, :item_to_added_id)
      json.items_to_removed_item_ids @rule.rule_action.rule_action_items_to_removeds.map { |removed| removed.item_id }
    end
  end
end
json.items do
  json.array! @items do |item|
    json.(item, :id, :name)
  end
end
json.user_id current_user.id
