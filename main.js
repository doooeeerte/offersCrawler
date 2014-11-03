( function main() {
  'use strict';

  var bands = require( './bands.json' );
  var crawl = require( './lib/crawler' );
  var visualizer = require( './lib/visualizer' );

  var bandsLeft;
  var requestBands = function requestBands( onResult, onFinished ) {
    bands.forEach( function( entry ) {
      var band = {
        maxPrice : 300
      };

      /* There's two syntaxes for bands:
         * An array of band name and max price in €
         * Simple band name, using a max price of 3 €
      */
      if ( entry instanceof Array ) {
        band.name = entry[ 0 ];
        band.maxPrice = entry[ 1 ] * 100;
      } else {
        band.name = entry;
      }

      crawl( band, function handleResult( result ) {
        onResult( result, band );
      }, function() {
        console.log( 'Done crawling for "' + band.name + '", ' + --bandsLeft + ' bands left' );
        if ( bandsLeft < 1 ) {
          onFinished();
        }
      } );
    } );
  };

  var server = require( 'http' ).createServer( function onRequest( request, response ) {
    if ( request.url === '/' ) {
      bandsLeft = bands.length;

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
} )();