class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :subscription_id

      t.timestamps
    end
    add_reference :clients, :user, index: true
  end
end
