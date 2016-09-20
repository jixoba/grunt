module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    options: {
      // 定义一个用于插入合并输出文件之间的字符
      separator: ';'
    },
    dist: {
      // 将要被合并的文件
      src: ['src/js/*.js'],
      // 合并后的JS文件的存放位置
      dest: 'dest/js/<%= pkg.name %>.js'
    }
  },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dest/js/<%= pkg.name %>.js',
        dest: 'dest/js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
    // define the files to lint
      files: ['gruntfile.js', 'src/js/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    watch:{
            start:{
                files: ['src/js/*.js'],
                tasks: ['jshint','concat','uglify']
            }
     }


  });


  grunt.event.on('watch', function(action, filepath, target) {
          grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });



  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['jshint','concat','uglify']);

};