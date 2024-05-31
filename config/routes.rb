Rails.application.routes.draw do
  resources :items
  resources :user_items, :path => :"user/items"
  resources :user_baskets, :path => :"user/basket", param: :item_id
  post "user/basket/apply" => "user_baskets#apply"
  resources :orders
  resources :rules

  get "login" => "sessions#new"
  post "login" => "sessions#create"
  get "logout" => "sessions#destroy"

  get "register" => "users#new"
  post "register" => "users#create"

  root "items#index"
end
