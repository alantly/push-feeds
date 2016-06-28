class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super do |user|
      client = Client.find_by_id client_params
      if client and not client.linked
        client.link user
      else
        DeviceSet.create(:user_id => user.id)
        user.add_device client
      end
    end
  end

  private

  def client_params
    params.require(:cid)
  end

end
