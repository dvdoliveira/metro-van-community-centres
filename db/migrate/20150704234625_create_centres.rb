class CreateCentres < ActiveRecord::Migration
  def change
    create_table :centres do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :province
      t.string :url
      t.text :description
      t.string :phone
      t.string :email
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
