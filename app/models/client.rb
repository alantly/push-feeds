class Client < ActiveRecord::Base
  belongs_to :user

  def notify
    self.class.push_to [self.subscription_id]
  end

  def self.find_subscription_ids_for feed_id
    Client.joins(user: :feeds).where(feeds: {id: feed_id}).pluck(:subscription_id)
  end

  def self.push_to sub_ids
    # TODO: Try and catch faraday.client exception
    cert_path = Rails.application.secrets.ssl_cert_path
    conn = Faraday.new "https://android.googleapis.com", :ssl => { :ca_path => cert_path, verify: !cert_path.empty? } do |con|
      con.adapter :em_http
    end

    resp = conn.post do |req|
      req.url "/gcm/send"
      req.headers['Content-Type'] = 'application/json'
      req.headers[:Authorization] = ENV['gcm_api_key']
      req.body = { registration_ids: sub_ids }.to_json
    end

    resp.on_complete {
      print resp.body
    }
  end
end
