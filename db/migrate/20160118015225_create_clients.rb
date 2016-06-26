class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :endpoint
      t.string :auth
      t.string :p256dh
      t.belongs_to :device_set, index: true

      t.timestamps
    end
  end
end
