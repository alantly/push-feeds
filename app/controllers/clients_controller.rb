class ClientsController < ApplicationController

  def index
    @client = current_user.clients.find_by_notification_address params.require(:subscription_id)
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

  private

  def client_params
    params.require(:client).permit(:subscription_id)
  end
end
