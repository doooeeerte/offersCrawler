exports.testRouter = function( test ) {
  var router = require( '../lib/router' );

  test.ok( router !== undefined, 'router is non null' );

  router.route( 'https://www.youtube.com/watch/YE7VzlLtp-4' );

  test.done();
};