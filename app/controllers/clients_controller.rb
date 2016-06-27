class ClientsController < ApplicationController

  def index
    @client = Client.find_by_endpoint params.require(:endpoint)
    render json: @client
  end

  def create
    @client = Client.new(client_params)
    if @client.save
      current_device_set.clients << @client
      render json: @client
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @client = Client.find(params.require(:id))
    if @client
      if @client.device_set.clients.length == 1 and not @client.device_set.user
        @client.device_set.destroy
      else
        @client.destroy
      end
    end
    head :no_content
  end

  def send_notification
    @client = Client.find_by_endpoint(params.require(:endpoint))
    @client.notify
    head :no_content
  end

  private

  def client_params
    require_params = params.require(:client)
    client = require_params.permit(:endpoint)
    keys = require_params.require(:keys).permit(:auth,:p256dh)
    client.merge keys
  end

  def current_device_set
    if current_user
      current_user.device_set
    else
      DeviceSet.create
    end
  end
end
