module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    clean: {
    	dist: ['<%= dist %>']
    },
    copy: {
    	dist: {
    		expand: true,
    		cwd: '<%= app %>',
    		src: '**',
    		dest: '<%= dist %>/',
    	}
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('build', [
      'clean:dist',
      'copy:dist'
  ]);

  grunt.registerInitTask('default',['build']);
};