( function crawler() {
  'use strict';

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
  var visualizeBand = function visualizeBand( response, el, band ) {
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
  };

  module.exports = {
    startOutput:    startOutput,
    endOutput:      endOutput,
    visualizeBand:  visualizeBand
  };
} )();