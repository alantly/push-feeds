class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  force_ssl if: :ssl_configured?
  before_filter :authenticate_user!
  after_filter :set_csrf_headers

  private

  def ssl_configured?
    !Rails.env.development?
  end

  def set_csrf_headers
    if response.body.empty?
      body = {}
    else
      body = JSON.parse(response.body)
    end
    body['CSRF-Param'] = "#{request_forgery_protection_token}"
    body['CSRF-Token'] = "#{form_authenticity_token}"
    response.body = body.to_json
    binding.pry
  end
end
