json.basket do
  json.array! @basket do |basket_item|
    json.(basket_item, :id)
    json.item do
      json.(basket_item.item, :id, :name, :description, :price)
    end
  end
end
json.actions do
  json.array! @actions do |action|
    json.(action, :id, :method, :message, :item_to_added_id)
    json.items_to_removed_item_ids action.rule_action_items_to_removeds.map { |x| x.item_id }
  end
end
json.user_id current_user.id
