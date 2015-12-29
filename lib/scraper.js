( function scraper() {
  'use strict';

  var scraperjs = require( 'scraperjs' );

  module.exports = function scrape( url, selector, handleFunc, showDebug ) {
    if ( showDebug ) { console.log( '\n=================\nCreating Scraper for "' + url + '"' ); }

    return scraperjs.StaticScraper.create( url )
          .scrape( function getScrapeResults( $ ) {
            if ( showDebug ) { console.log( 'Scraping...' ); }

            if ( $( '.g-recaptcha' ).length ) {
              console.log( 'CAPTCHA REQUESTED' );
            }
            
            return $( selector ).map( function mapScrapeResult() {
              return $( this );
            } ).get();
          }, function handleScrapeResult( objs ) {
              if ( showDebug ) { console.log( 'Handling ' + objs.length + ' results' ); }

              handleFunc( objs );
          } );
  };
} )();
