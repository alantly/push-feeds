class CreateGroupTable < ActiveRecord::Migration
  def change
    create_table :group_tables do |t|
      t.belongs_to :user, index: true
    end
  end
end
