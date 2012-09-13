class NbecToken < ConsumerToken

  NBEC_SETTINGS = {
    site: "https://elections.nationbuilder.com",
    request_token_path: "/oauth/request_token",
    access_token_path: "/oauth/access_token",
    authorize_path: "/oauth/authorize"
  }

  # get the consumer for this token
  def self.consumer(options={})
    @consumer ||= OAuth::Consumer.new(credentials[:key], credentials[:secret], NBEC_SETTINGS.merge(options))
  end

  def candidate
    get_json('/api/v1/candidate/current')
  end

  def districts(state)
    get_json('/api/v1/regions?state='+state)
  end

  def district_geojson(params)
    get_json("/api/v1/regions/tile?coords=#{params[:coords]}&region_type=#{params[:region_type]}")
  end

  private
    def get_json(url)
      begin
        JSON.parse(self.client.get(url).body)
      rescue JSON::ParserError => e
        self.destroy
        raise NotAuthorizedError.new("You are no longer authorized")
      end
    end
end
