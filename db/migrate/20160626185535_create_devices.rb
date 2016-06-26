class CreateDeviceSets < ActiveRecord::Migration
  def change
    create_table :device_sets do |t|
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
  end
end
