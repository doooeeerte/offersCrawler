( function main( require ) {
  'use strict';

  var bands      = require( './bands.json' );
  var iterate    = require( './lib/crawler' );
  var visualizer = require( './lib/visualizer' );

  var requestBands = function requestBands( onResult, onFinished ) {
    iterate( bands, onResult, onFinished );
  };

  var server = require( 'http' ).createServer( function onRequest( request, response ) {
    if ( request.url === '/' ) {
      visualizer.startOutput( response );

      requestBands( function onResult( el, band ) {
        visualizer.visualizeBand( response, el, band );
      }, function onFinished() {
        visualizer.endOutput( response );
      } );
    } else {
      response.writeHead( 404 );
      response.end( 'Not found' );
    }
  } );

  server.listen( 31337 );
} )( require );