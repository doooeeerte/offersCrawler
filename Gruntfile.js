module.exports = function( grunt ) {
  'use strict';

  // Project configuration.
  grunt.initConfig( {
    // Task configuration.
    jshint: {
      options: {
        // Global Variables
        'globals': {
        },
        
        // Enforcing Options
        'bitwise':        true,
        'camelcase':      true,
        'curly':          true,
        'eqeqeq':         true,
        'es3':            true,
        'freeze':         true,
        'immed':          true,
        'indent':         2,
        'latedef':        true,
        'maxdepth':       4,
        'maxstatements':  35,
        'maxcomplexity':  11,
        'newcap':         true,
        'noarg':          true,
        'noempty':        true,
        'nonew':          true,
        'quotmark':       'single',
        'undef':          true,
        'unused':         true,
        'strict':         true,
        
        // Environments
        'browser':        false,
        'node':           true,
        'jquery':         true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: [ 'main.js', 'lib/*.js', 'test/*Test.js' ]
      }
    },
    nodeunit: {
      files: 'test/*Test.js'
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: 'jshint:gruntfile'
      },
      src: {
        files: [ 'main.js', 'lib/*.js', 'test/*Test.js' ],
        tasks: 'jshint:src'
      },
      test: {
        files: [ 'main.js', 'lib/*.js', 'test/*Test.js', '<%= nodeunit.files %>' ],
        tasks: 'nodeunit'
      }
    }
  });

  // Used by npm test
  grunt.registerTask( 'test', function() {
    grunt.task.run( [ 'jshint:gruntfile', 'jshint:src', 'nodeunit' ] );
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
};
