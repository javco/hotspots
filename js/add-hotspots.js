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
      hotspots.addHotspots();
      /*pieces.addPiece();
      pieces.cancelPiece();
      pieces.savePiece();
      pieces.editPiece();
      pieces.removePiece();*/
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
    addHotspots: function() {
      hotspots.coords = new Array();
      // render hotspot on image and append coords to array
      hotspots.settings.imageContainer.find('.hotspots-container').click(function(e) {
        var hp = hotspots.getHotspotPosition(e, $(this), 20, true); // true = percent | false or no attr = px
        var hotspot = $('<div class="hotspot visible">').css({
            left: hp.x,
            top: hp.y,
        });
        //render
        $(this).append(hotspot);
        //add to array
        hotspots.coords.push(hp.x + ',' + hp.y);
        //$(".boxer-info span").text("X: " + hp.x + ", Y: " + hp.y);
      });
    },
  };
  hotspots.init({
    coords: null,
    imageContainer: $('#hotspots-image-container'),
  });
});
