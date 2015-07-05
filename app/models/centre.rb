class Centre < ActiveRecord::Base
  def self.group_by_city
    Centre.all.group_by(&:city)
  end
end
