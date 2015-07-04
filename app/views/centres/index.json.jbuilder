json.array!(@centres) do |centre|
  json.extract! centre, :id, :name, :address, :city, :province, :url, :description, :phone, :email, :latitude, :longitude
  json.url centre_url(centre, format: :json)
end
