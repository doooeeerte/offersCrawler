( function crawler() {
  'use strict';

  var scrape = require( './scraper' );

  var crawl = function crawl( entry, resultFunc, doneFunc ) {
    var band = entry.name;

    var scraper = scrape( 'https://www.rebuy.de/kaufen/suchen?inStock=1&c=83&q=%22' + encodeURI( band ) + '%22&priceMax=' + entry.maxPrice + '&sortBy=price_asc',
                          '.product',
                          function handleResultList( obj ) {
                            obj.forEach( function handleResult( result ) {
                              var title = result.find( 'h2 > a' ).text().trim();

                              if ( title.indexOf( band + ' - ' ) === 0 ) {
                                resultFunc( result );
                              }
                            } );
                          } );

    if ( doneFunc ) {
      scraper.then( function onDoneScraping() {
        doneFunc();
      } );
    }
  };

  module.exports = function iterate( bands, onResult, onFinished ) {
    var bandsLeft = bands.length;
    
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
} )();