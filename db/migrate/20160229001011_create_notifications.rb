class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :site_id, null: false, index: true
      t.string :title, default: ""
      t.string :url, default: ""
      t.belongs_to :subscription, index: true
      t.timestamps null: false
    end
  end
end
