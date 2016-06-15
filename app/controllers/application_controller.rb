class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery
  force_ssl if: :ssl_configured?
  before_filter :authenticate_user!
  after_filter :set_csrf_headers

  private

  def ssl_configured?
    !Rails.env.development?
  end

  def set_csrf_headers
    response.headers['Csrf-Param'] = "#{request_forgery_protection_token}"
    response.headers['Csrf-Token'] = "#{form_authenticity_token}"
  end
end
