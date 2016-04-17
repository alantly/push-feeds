class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :endpoint
      t.string :auth
      t.string :p256dh

      t.timestamps
    end
    add_reference :clients, :user, index: true
  end
end
