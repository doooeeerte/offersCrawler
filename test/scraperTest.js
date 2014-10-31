exports.testScraper = function( test ) {
  //test.expect( 1 );

  var links = [];
  var scraperGenerator = require( '../lib/scraper' );

  // Nock Responses
  var nock = require( 'nock' );
  nock( 'https://github.com' )
    .get( '/doooeeerte/offersCrawler' )
    .reply( 200, '<html><body><a href="#"><div>1</div></a><a href="#">2</a></body></html>' );
  
  scraperGenerator( 'https://github.com/doooeeerte/offersCrawler', 'a', function handleResult( obj ) {
    links.push.apply( links, obj );
  } )
  .then( function scrapingDone() {
    var i;

//    for ( i = 0; i < links.length; i++ ) {
//      console.log( links[ i ].html() );
//    }

    test.ok( links.length === 2, 'scraper returned 2 links' );

    test.done();
  } );
};