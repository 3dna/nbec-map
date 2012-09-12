$(document).ready(function(){
  var po = org.polymaps;
  var map = po.map()
      .container(document.getElementById("map").appendChild(po.svg("svg")))
      .center({lat: 39, lon: -96})
      .zoom(4)
      .zoomRange([1, 10])
      .add(po.interact());

  //OSM tiles
  map.add(po.image()
      .url(po.url("http://tile.openstreetmap.org"
      + "/{Z}/{X}/{Y}.png")));

  //detailed US map
  // map.add(po.image()
  //     .url(po.url("http://{S}tile.cloudmade.com"
  //     + "/1a1b06b230af4efdbb989ea99e9841af" // tried: "e5ecdd0ae131480fa8d63efdbb38df06", didn't work, but see http://cloudmade.com/register
  //     + "/997/256/{Z}/{X}/{Y}.png")
  //     .hosts(["a.", "b.", "c.", ""])));

  //basic US map
  // map.add(po.image()
  //      .url(po.url("http://{S}tile.cloudmade.com"
  //      + "/1a1b06b230af4efdbb989ea99e9841af" // tried: "e5ecdd0ae131480fa8d63efdbb38df06", didn't work, but see http://cloudmade.com/register
  //      + "/20760/256/{Z}/{X}/{Y}.png")
  //      .hosts(["a.", "b.", "c.", ""])));

  var lower_state_layer = po.geoJson()
        .url("/regions/tile?coords={B}&region_type=lower_state_district")
        .on("load", load)
        .id("lower_state");
  
  map.add(lower_state_layer);
  
  var upper_state_layer = po.geoJson()
    .url("/regions/tile?coords={B}&region_type=upper_state_district")
    .id("upper_state")
    .on("load", load)
    .visible(false)
    
  map.add(upper_state_layer);

  var federal_layer = po.geoJson()
    .url("/regions/tile?coords={B}&region_type=federal_district")
    .id("federal")
    .on("load", load)
    .visible(false)
  
  map.add(federal_layer);

  // //states
  map.add(po.geoJson()
      .url("http://polymaps.appspot.com/state/{Z}/{X}/{Y}.json")
      .id("state"));

  map.add(po.compass()
      .pan("none"));
      
  $('button#toggle_federal').click(function(){
    console.log($(this).hasClass('active'));
    federal_layer.visible(!$(this).hasClass('active'));
  });
  
  $('button#toggle_upper_state').click(function(){
    console.log($(this).hasClass('active'));
    upper_state_layer.visible(!$(this).hasClass('active'));
  });
  
  $('button#toggle_lower_state').click(function(){
    console.log($(this).hasClass('active'));
    lower_state_layer.visible(!$(this).hasClass('active'));
  });
  
  function load(e) {
    for (var i = 0; i < e.features.length; i++) {
      var feature = e.features[i];
      feature.element.setAttribute("id", feature.data.id);
      var content = "Region "+feature.data.properties.name+" ("+feature.data.properties.type+") ["+feature.data.properties.state+"]";
      $(feature.element).hover(function(){
        $('#feature_desc').html(content);
      },
      function(){
        $('#feature_desc').html('');
      });
    }
  }
});