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
    @client = Client.find(params.require(:id))
    @client.destroy
    head :no_content
  end

  def send_notification
    @client = Client.find_by_subscription_id(params.require(:subscription_id))
    @client.notify
    head :no_content
  end

  private

  def client_params
    params.require(:client).permit(:subscription_id)
  end
end
