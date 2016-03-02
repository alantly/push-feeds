class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.string :filter
      t.belongs_to :feed, index: true
      t.belongs_to :user, index: true
      t.timestamps null: false
    end
  end
end
