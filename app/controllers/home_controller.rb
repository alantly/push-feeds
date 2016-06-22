class HomeController < ApplicationController
  skip_before_filter :authenticate_user!, :only => :index
  skip_after_filter :set_csrf_headers

  def index
    @current_path = params[:path]
    if current_user
      @user_email = current_user.email
    end
  end
end
