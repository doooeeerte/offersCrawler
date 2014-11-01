var nockResponses = function nockResponses() {
  'use strict';

  var nock = require( 'nock' );
  nock( 'https://www.rebuy.de/' )
    .get( '/kaufen/suchen?inStock=1&c=83&q=%22Heaven+Shall+Burn%22&priceMax=2000&sortBy=price_asc' )
    .reply( 200, require( 'fs' ).readFileSync( './test/sample.html', 'utf8' ) );
};

exports.testScraper = function testScraper( test ) {
  'use strict';

  var links = [];
  var scraperGenerator = require( '../lib/scraper' );

  nockResponses();
  
  scraperGenerator( 'https://www.rebuy.de/kaufen/suchen?inStock=1&c=83&q=%22Heaven+Shall+Burn%22&priceMax=2000&sortBy=price_asc', '.product', function handleResult( obj ) {
    links.push.apply( links, obj );
  } )
  .then( function scrapingDone() {
    test.ok( links.length === 5, 'scraper returned 5 products (actually it was ' + links.length + ')' );

    test.done();
  } );
};