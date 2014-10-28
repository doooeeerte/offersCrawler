( function() {
  'use strict';

  var scraperjs = require( 'scraperjs' );
  var router = new scraperjs.Router();

  router.otherwise( function( url ) {
    throw new Error( 'Url "' + url + '" couldn\'t be routed.' );
  } );

  // for offline tests...
  router.on( 'http://localhost:31337/' )
        .createStatic()
        .scrape( function( $ ) {
          return $( 'a' ).map( function() {
            return $( this ).attr( 'href' );
          } ).get();
        }, function( links, utils ) {
            console.log( utils.params.id, links );
        } );

  module.exports = router;
} )();