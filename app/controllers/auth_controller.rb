class AuthController < ApplicationController
  def index
    if current_user and (@nbec = current_user.nbec)
      @candidate = @nbec.candidate
    end
  end
end