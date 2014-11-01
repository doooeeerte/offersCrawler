exports.testCrawler = function testCrawler( test ) {
  'use strict';

  var testResponse;

  var crawlerGenerator = require( '../lib/crawler' );
  var crawler = crawlerGenerator( 'https://github.com/doooeeerte/offersCrawler', function handleResult( responseObj ) {
    testResponse = responseObj;
  } );

  test.ok( crawler !== undefined, 'crawler is non null' );

  crawler();

  test.ok( testResponse.response === 'someStuff', 'crawler test response is "someStuff"' );
  test.ok( testResponse.debug === 'crawled "https://github.com/doooeeerte/offersCrawler"', 'crawled the given url' );
  test.done();
};