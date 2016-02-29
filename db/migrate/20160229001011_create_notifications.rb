class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :title, default: ""
      t.string :url, default: ""
      t.belongs_to :feed, index: true
      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
