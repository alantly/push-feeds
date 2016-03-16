class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  force_ssl if: :ssl_configured?
  before_filter :authenticate_user!

  private

  def ssl_configured?
    !Rails.env.development?
  end
end
