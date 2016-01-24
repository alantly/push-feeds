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
    conn = Faraday.new "https://android.googleapis.com", :ssl => { :ca_path => Rails.application.secrets.ssl_cert_path } do |con|
      con.adapter :em_http
    end

    resp = conn.post do |req|
      req.url "/gcm/send"
      req.headers['Content-Type'] = 'application/json'
      req.headers[:Authorization] = 'key=AIzaSyDWkWVCBzDgGMEND9BkYxfZM-XcU2t_VdY'
      req.body = "{\"registration_ids\":[\"#{ params[:subscription_id] }\"]}\""
    end

    resp.on_complete {
      render json: resp.body
      request.env['async.callback'].call response
    }

    throw :async
  end

  private

  def client_params
    params.require(:client).permit(:subscription_id)
  end
end
