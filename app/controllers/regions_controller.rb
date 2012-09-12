class RegionsController < ApplicationController
  before_filter :get_nbec_connection
  
  def tile
    render :json => @nbec.district_geojson(:coords => params[:coords], :region_type => params[:region_type])
  end
  
  private
    def get_nbec_connection
      @nbec = NbecToken.first(:conditions=>{:user_id=>current_user.id})
    end
end