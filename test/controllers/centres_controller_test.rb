require 'test_helper'

class CentresControllerTest < ActionController::TestCase
  setup do
    @centre = centres(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:centres)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create centre" do
    assert_difference('Centre.count') do
      post :create, centre: { address: @centre.address, city: @centre.city, description: @centre.description, email: @centre.email, latitude: @centre.latitude, longitude: @centre.longitude, name: @centre.name, phone: @centre.phone, province: @centre.province, url: @centre.url }
    end

    assert_redirected_to centre_path(assigns(:centre))
  end

  test "should show centre" do
    get :show, id: @centre
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @centre
    assert_response :success
  end

  test "should update centre" do
    patch :update, id: @centre, centre: { address: @centre.address, city: @centre.city, description: @centre.description, email: @centre.email, latitude: @centre.latitude, longitude: @centre.longitude, name: @centre.name, phone: @centre.phone, province: @centre.province, url: @centre.url }
    assert_redirected_to centre_path(assigns(:centre))
  end

  test "should destroy centre" do
    assert_difference('Centre.count', -1) do
      delete :destroy, id: @centre
    end

    assert_redirected_to centres_path
  end
end
