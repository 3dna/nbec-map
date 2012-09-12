class ApplicationController < ActionController::Base
  protect_from_forgery
  rescue_from NotAuthorizedError, :with => :redirect_on_unauthorized
  
  private
    def redirect_on_unauthorized
      flash[:alert] = "You are no longer authorized"
      redirect_to :root
    end
end
