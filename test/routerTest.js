exports.testRouter = function( test ) {
  var router = require( '../lib/router' );

  test.ok( router !== undefined, 'router is non null' );
  test.done();
};