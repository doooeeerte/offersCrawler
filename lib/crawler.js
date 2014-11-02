( function crawler() {
  'use strict';

  var scrape = require( './scraper' );

  module.exports = function crawl( entry, resultFunc, doneFunc ) {
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
} )();