( function main() {
  'use strict';

  var bands = require( './bands.json' );
  var bandsLeft;

  var crawl = require( './lib/crawler' );

  var startOutput = function startOutput( response ) {
    response.writeHead( 200, {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
      pragma: 'no-cache'
    } );
    response.write( '<html><head><style type="text/css">' + 
      'body > div { display: inline-block; max-width: 110px; font-size: 13px; vertical-align: top; margin: 5px; box-shadow: 3px 3px 10px black; }' +
      'body > div > a { height: 70px; display: inline-block; overflow: hidden; width: 110px; color: black; text-decoration: none; }' +
      'body > div > div { text-align: right; }' + 
      '</style><base href="https://www.rebuy.de/kaufen/"/></head><body>' );
  };
  var endOutput = function endOutput( response ) {
    response.end( '</body></html>');
  };

  var requestBands = function requestBands( onResult, onFinished ) {
    bands.forEach( function( entry ) {
      var obj = {
        maxPrice : 300
      };

      /* There's two syntaxes for bands:
         * An array of band name and max price in €
         * Simple band name, using a max price of 3 €
      */
      if ( entry instanceof Array ) {
        obj.name = entry[ 0 ];
        obj.maxPrice = entry[ 1 ] * 100;
      } else {
        obj.name = entry;
      }

      crawl( obj, function handleResult( result ) {
        onResult( result, obj );
      }, function() {
        console.log( 'Done crawling for "' + obj.name + '", ' + --bandsLeft + ' bands left' );
        if ( bandsLeft < 1 ) {
          onFinished();
        }
      } );
    } );
  };

  var server = require( 'http' ).createServer( function( request, response ) {
    if ( request.url === '/' ) {
      bandsLeft = bands.length;

      startOutput( response );

      requestBands( function onResult( el, band ) {
        var maxPrice = band.maxPrice;
        
        response.write( '<div><img src="' + el.find( 'img' ).attr( 'data-original' ) + '"/><br/>' );
        var anchor = el.find( 'h2 a:nth-child(1)' );
        response.write( '<a target="rebuy" href="' + anchor.attr( 'href' ) + '">' + anchor.text().trim() + '</a><br/>' );

        var price = parseFloat( el.find( '.price strong' ).text().replace( ' €', '' ).replace( ',', '.' ) ) * 100;
        var col = 'red';

        if ( price * 3 < maxPrice ) {
          col = 'green';
        } else if ( price * 1.5 < maxPrice ) {
          col = 'yellow';
        }

        response.write( '<div style="background-color: ' + col + '"><b>' + ( price / 100 ) + ' € </b></div></div>' );            
      }, function onFinished() {
        endOutput( response );
      } );
    } else {
      response.writeHead( 404 );
      response.end( 'Not found' );
    }
  } );

  server.listen( 31337 );
} )();