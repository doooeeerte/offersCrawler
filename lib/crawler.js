( function() {
  'use strict';

  module.exports = function createCrawler( url, handleResult ) {
    return function() {
      handleResult( {
        debug: 'crawled "' + url + '"',
        response: 'someStuff'
      } );
    };
  };
} )();