( function crawler() {
  'use strict';

  module.exports = function createCrawler( url, handleResult ) {
    return function getCrawler() {
      handleResult( {
        debug: 'crawled "' + url + '"',
        response: 'someStuff'
      } );
    };
  };
} )();