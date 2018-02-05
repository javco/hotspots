/**
 * Advanced example. 
 * Show hotspots
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
      hotspots.attachHotspots();
    },
    attachHotspots: function(){
      $.getJSON( 'ajax/categories.json', function( data ) {
        //attach wheels, moustaches and hats hotspots
        $.each( data, function( key, value ) {
          console.log(key);  
          console.log(value);
          $.each( value, function( k, v ) {
            var point = v.split(',');
            var hotspot = $('<div class="hotspot visible" data-category="'+key+'">')
            .css({
                left: point[0],
                top: point[1],
            });
            hotspots.settings.imageContainer.find('.hotspots-container').append(hotspot);
          });
        });
        //hotspots hover functionality
        hotspots.settings.imageContainer.find('.hotspots-container .hotspot').each(function(){
          $(this).hover(function(){
            var category = $(this).attr('data-category'); 
            var left = $(this).css('left');
            var top = $(this).css('top');

            //clean dialog alert
            hotspots.settings.popupDialog.empty();
            //set as active
            hotspots.settings.popupDialog.addClass('active');

            //new dialog alert position
            hotspots.settings.popupDialog.css('top', parseInt(top) - 10);
            hotspots.settings.popupDialog.css('left', parseInt(left) + 50 );

            //wrap into div.category-dialog and append
            var dialogBox = '<div class="category-dialog" data-category="' + category + '"><p>' + category.toUpperCase() + '</p></div>';
            $( dialogBox ).appendTo(hotspots.settings.popupDialog);

            //set on hover out --> hide
            $(hotspots.settings.popupDialog).hover(function () {
              hotspots.settings.popupDialog.data('hovering', true);
            }, function () {
              setTimeout(function() {
                //clean dialog popup
                hotspots.settings.popupDialog.data('hovering', false);
                hotspots.settings.popupDialog.removeClass('active');
                hotspots.settings.popupDialog.empty();
              }, 2000);
            });
          }, function(){
            setTimeout(function() {
              if( !hotspots.settings.popupDialog.data('hovering') ){
                hotspots.settings.popupDialog.removeClass('active');
                //clean dialog popup
                hotspots.settings.popupDialog.empty();
              }                  
            }, 3000);
          });
        });
      });
    },
  };
  hotspots.init({
    coords: null,
    imageContainer: $('#hotspots-image-container-advanced-example-show-hotspots'),
    popupDialog: $('#popup-dialog'),
  });
});
