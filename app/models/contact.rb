class Contact < ActiveRecord::Base

  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /.+@.+\.+/i
end