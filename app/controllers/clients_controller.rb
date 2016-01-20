class ClientsController < ApplicationController

  def create
    @client = Client.new(client_params)
    if @client.save
      current_user.clients << @client
      # save to cookie to track?
      render json: @client
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end
  
  private

  def client_params
    params.require(:client).permit(:notification_address)
  end
end
