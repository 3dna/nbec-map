Myvoterapp::Application.routes.draw do
  resources :oauth_consumers do
    member do
      get :callback
      get :callback2
      match 'client/*endpoint' => 'oauth_consumers#client'
    end
  end
  
  get 'auth' => 'auth#index'
  get 'mapping/polymap' => 'mapping#polymap'
  
  # proxy for NBEC's district tile service
  match 'regions/tile' => 'regions#tile'
  
  resources :regions

  devise_for :users
  root :to => "auth#index"
end
