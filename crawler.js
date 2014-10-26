( function() {
  'use strict';

  var scraperjs = require( 'scraperjs' );
  var router = new scraperjs.Router();

  router.otherwise( function( url ) {
    console.log( 'Url "' + url + '" couldn\'t be routed.' );
  } );

  var path = {};

  router.on( 'https?://(www.)?youtube.com/watch/:id' )
        .createStatic()
        .scrape( function( $ ) {
          return $( 'a' ).map( function() {
            return $( this ).attr( 'href' );
          } ).get();
        }, function( links, utils ) {
            console.log( utils.params.id, links );
            path[ utils.params.id ] = links;
        } );

  router.route( 'https://www.youtube.com/watch/YE7VzlLtp-4' );
} )();