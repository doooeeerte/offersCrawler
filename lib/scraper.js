( function() {
  'use strict';

  var scraperjs = require( 'scraperjs' );

  module.exports = function createScraper( url, selector, handleFunc, showDebug ) {
    if ( showDebug ) { console.log( '\n=================\nCreating Scraper for "' + url + '"' ); }

    return scraperjs.StaticScraper.create( url )
          .scrape( function( $ ) {
            if ( showDebug ) { console.log( 'Scraping...' ); }

            return $( selector ).map( function() {
              return $( this );
            } ).get();
          }, function( objs ) {
              if ( showDebug ) { console.log( 'Handling result' ); }

              handleFunc( objs );
          } );
  };
} )();