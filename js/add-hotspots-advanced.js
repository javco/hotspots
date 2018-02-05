/**
 * Advanced example. 
 * Add hotspots to catergories
 */
jQuery(document).ready(function($) {
  var hotspots = {
    init: function(settings) {
      hotspots.settings = settings;
      hotspots.readSettings();
      hotspots.setup();
    },
    readSettings: function() {
      console.log(hotspots.settings);
    },
    setup: function() {
      hotspots.start();
    },
    start: function() {
      hotspots.addCategoryHotspots();
    },
    getHotspotPosition: function(evt, el, hotspotsize, percent) {
      var left = el.offset().left;
      var top = el.offset().top;
      var hotspot = hotspotsize ? hotspotsize : 0;
      if (percent) {
          x = (evt.pageX - left - (hotspot / 2)) / el.outerWidth() * 100 + '%';
          y = (evt.pageY - top - (hotspot / 2)) / el.outerHeight() * 100 + '%';
      } else {
          x = (evt.pageX - left - (hotspot / 2));
          y = (evt.pageY - top - (hotspot / 2));
      }
      return {
          x: x,
          y: y
      };
    },
    addCategoryHotspots: function(){
      $('#categories-list').on('click','li a', function(event){
        event.preventDefault();

        //prevently remove all hotspots from the image
        hotspots.settings.imageContainer.find('.hotspots-container .hotspot').remove();
        //get selected item
        var listItem = $(this).parent();
        //get current hotspots (aka 'hps') for selected category
        var hps = listItem.attr('data-coords');
        //initialize 'coords' array
        hotspots.coords = new Array();

        //check for currents hotspots. If so:
        // 1. draw them on image
        // 2. add them to  
        if(hps.trim() != ""){
          hps = JSON.parse(hps);
          $.each( hps, function( key, value ) {
            hps = value.split(',');
            var hotspot = $('<div class="hotspot">').css({
              left: point[0],
              top: point[1],
            });
            hotspots.settings.imageContainer.find('.hotspots-container').append(hotspot);
            //insert into pieces.coords array
            hotspots.coords.push(point[0]+','+point[1]);
          });
        }

        //show 'edit-category' dialog
        $("#edit-category").show();
        $("#edit-category").find('span.category').text( $(this).text() );

        //set 'hotspots' functionality
        hotspots.settings.imageContainer.find('.hotspots-container').click(function(e) {
          var hp = hotspots.getHotspotPosition(e, $(this), 20, true); // true = percent | false or no attr = px
          var hotspot = $('<div class="hotspot visible">').css({
              left: hp.x,
              top: hp.y,
          });
          //render hotspots
          $(this).append(hotspot);
          //add hotspots to array
          hotspots.coords.push(hp.x + ',' + hp.y);
        });

        //save category
        $('#edit-category a.save').unbind('click');
        $('#edit-category a.save').click(function(event){
          event.preventDefault();
          //add recently added hostspots to category as JSON array
          listItem.attr('data-coords', JSON.stringify(hotspots.coords));
          //remove all hotspots from the image
          hotspots.settings.imageContainer.find('.hotspots-container .hotspot').remove();
          //hide dialog
          $("#edit-category").hide();
        });

        //cancel category
        $('#edit-category a.cancel').unbind('click');
        $('#edit-category a.cancel').click(function(event){
          event.preventDefault();
          //remove all hotspots from the image
          hotspots.settings.imageContainer.find('.hotspots-container .hotspot').remove();
          //hide dialog
          $("#edit-category").hide();
        });
        
      });
    },
  };
  hotspots.init({
    coords: null,
    imageContainer: $('#hotspots-image-container-advanced-example'),
  });
});
