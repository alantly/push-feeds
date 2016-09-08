class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super do |user|
      client = Client.find_by_id client_params
      if client
        if not client.linked
          user.device_set.destroy
          client.link user
        else
          user.add_device client
        end
      end
    end
  end

  private

  def client_params
    params[:cid]
  end

end
