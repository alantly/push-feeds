class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |user|
      client = Client.find_by_id client_params
      if client
        unless client.linked
          client.delete_local_account
        end
        user.add_device client
      end
    end
  end

  private

  def client_params
    params.require(:cid)
  end
end
