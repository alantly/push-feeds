Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}

  resources :feeds, only: [:index, :destroy] do
    post :subscribe, on: :collection
  end
  resources :clients, only: [:index, :create, :destroy]
  post 'clients/send_notification' => 'clients#send_notification'
end
