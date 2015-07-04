class CentresController < ApplicationController
  before_action :set_centre, only: [:show, :edit, :update, :destroy]

  # GET /centres
  # GET /centres.json
  def index
    @centres = Centre.all
  end

  # GET /centres/1
  # GET /centres/1.json
  def show
  end

  # GET /centres/new
  def new
    @centre = Centre.new
  end

  # GET /centres/1/edit
  def edit
  end

  # POST /centres
  # POST /centres.json
  def create
    @centre = Centre.new(centre_params)

    respond_to do |format|
      if @centre.save
        format.html { redirect_to @centre, notice: 'Centre was successfully created.' }
        format.json { render :show, status: :created, location: @centre }
      else
        format.html { render :new }
        format.json { render json: @centre.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /centres/1
  # PATCH/PUT /centres/1.json
  def update
    respond_to do |format|
      if @centre.update(centre_params)
        format.html { redirect_to @centre, notice: 'Centre was successfully updated.' }
        format.json { render :show, status: :ok, location: @centre }
      else
        format.html { render :edit }
        format.json { render json: @centre.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /centres/1
  # DELETE /centres/1.json
  def destroy
    @centre.destroy
    respond_to do |format|
      format.html { redirect_to centres_url, notice: 'Centre was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_centre
      @centre = Centre.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def centre_params
      params.require(:centre).permit(:name, :address, :city, :province, :url, :description, :phone, :email, :latitude, :longitude)
    end
end
