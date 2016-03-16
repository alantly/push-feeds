class PagesController < ApplicationController
  skip_before_filter :authenticate_user!, :only => :index

  def index
    if user_signed_in?
      redirect_to feeds_path
    else
      if request.path.include? 'sign_in'
        @current_path = 'login'
      elsif request.path.include? 'sign_up'
        @current_path = 'signup'
      end
    end
  end
end
