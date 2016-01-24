class ClientsController < ApplicationController

  def index
    @client = current_user.clients.find_by_subscription_id params.require(:subscription_id)
    render json: @client
  end

  def create
    @client = Client.new(client_params)
    if @client.save
      current_user.clients << @client
      render json: @client
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @client = Client.find(params[:id])
    @client.destroy
    head :no_content
  end

  def send_notification
    push_to [params[:subscription_id]]
  end

  private

  def push_to sub_ids
    cert_path = Rails.application.secrets.ssl_cert_path
    conn = Faraday.new "https://android.googleapis.com", :ssl => { :ca_path => cert_path, verify: !cert_path.empty? } do |con|
      con.adapter :em_http
    end

    resp = conn.post do |req|
      req.url "/gcm/send"
      req.headers['Content-Type'] = 'application/json'
      req.headers[:Authorization] = 'key=AIzaSyDWkWVCBzDgGMEND9BkYxfZM-XcU2t_VdY'
      req.body = { registration_ids: sub_ids }.to_json
    end

    resp.on_complete {
      print resp.body
    }

    head :no_content
  end

  def client_params
    params.require(:client).permit(:subscription_id)
  end
end
