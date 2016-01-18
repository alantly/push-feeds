class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :notification_address

      t.timestamps
    end
    add_reference :clients, :user, index: true
  end
end
