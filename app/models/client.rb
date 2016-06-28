class Client < ActiveRecord::Base
  belongs_to :device_set
  has_many :feeds, through: :device_set
  before_save :normalize_endpoint

  def notify
    self.class.notify_without_payload_to [self.endpoint]
  end

  def push notification
    request_body = {
      subscription: {
        endpoint: "https://android.googleapis.com/gcm/send/#{self.endpoint}",
        keys: {
          auth: self.auth,
          p256dh: self.p256dh
        }
      },
      gcm_key: ENV['gcm_api_key'],
      payload: notification
    }
    post_to "https://#{ENV['push_service_hostname']}", "/notification", request_body
  end

  def self.notify_without_payload_to sub_ids
    # TODO: Try and catch faraday.client exception
    cert_path = Rails.application.secrets.ssl_cert_path
    conn = Faraday.new "https://android.googleapis.com", :ssl => { :ca_path => cert_path, verify: !cert_path.empty? } do |con|
      con.adapter :em_http
    end

    resp = conn.post do |req|
      req.url "/gcm/send"
      req.headers['Content-Type'] = 'application/json'
      req.headers[:Authorization] = "key=#{ENV['gcm_api_key']}"
      req.body = { registration_ids: sub_ids }.to_json
    end

    resp.on_complete {
      print resp.body
    }
  end

  def linked
    self.device_set.user
  end

  def delete_local_account
    device_set = self.device_set
    self.device_set = nil
    self.save
    device_set.destroy
  end

  def link user
    self.device_set.user = user
  end

  def local_account
    self.device_set.clients.length == 1 and not self.linked
  end

  private

  def normalize_endpoint
    result = self.endpoint.split("/")
    self.endpoint = result[-1]
  end

  def post_to hostname, resource, body
    # TODO: Try and catch faraday.client exception
    cert_path = Rails.application.secrets.ssl_cert_path
    conn = Faraday.new hostname, :ssl => { :ca_path => cert_path, verify: !cert_path.empty? } do |con|
      con.adapter :em_http
    end

    resp = conn.post do |req|
      req.url resource
      req.headers['Content-Type'] = 'application/json'
      req.body = body.to_json
    end

    resp.on_complete {
      print resp.body
    }
  end

end
