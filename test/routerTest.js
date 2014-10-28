exports.testRouter = function( test ) {
  var router = require( '../lib/router' );

  test.ok( router !== undefined, 'router is non null' );

  router.route( 'http://localhost:31337/' );

  test.done();
};