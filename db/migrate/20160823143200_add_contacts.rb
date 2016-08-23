class AddContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.datetime :created_at
      t.datetime :updated_at
    end
  end
end