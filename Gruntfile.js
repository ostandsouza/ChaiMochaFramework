module.exports = function(grunt) {
// ===========================================================================
// CONFIGURE GRUNT ===========================================================
// ===========================================================================

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        shell: {

            app: {
                //command: 'cd C:/javascript/server/crud',
                command: 'npm start',
                options: {
                    async: false,
                    execOptions: {
                            cwd: 'C:/javascript/server/crud'
                            //cwd: '<%= Path1 %>'
                        }
                }
            },

            mongodb: {
                command: 'mongod --directoryperdb',
                options: {
                    async: false,
                    // stdout: false,
                    // stderr: true,
                    // failOnError: true,
                     execOptions: {
                         cwd: 'C:/Program Files/MongoDB/Server/4.0/bin'
                         //cwd: '<%= Path2 %>'
                     }
                }
        }
    },

        nodemon: {
            dev: {
              script: 'C:/javascript/server/crud/server/main.js'
              //script: '<%= Path1 %>/server/main.js'
            }
          }, // nodemon
      
          concurrent: {
            dev: {
              tasks: ['shell:app','shell:mongodb','nodemon'],
              options: {
                logConcurrentOutput: true
              }
            }
          }, // concurrent

          open : {
            dev : {
              path: 'http://localhost:4200/update/ExecuteApi/5c3c7784f8f63eb5708d053c'
            }
        },

        http: {
            local: {
              options: {
                url: 'http://localhost:3000/api/',
                method: 'POST',
                json: true,
                // headers: {
                //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                // },
                body:
                    {"url": "mongodb://localhost:27017/RestApi"}
                  ,
                encoding: 'utf8',
              }
            }
          }
        });

        
  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-http');

  grunt.registerTask('default', '', function() {
      // var path1 = grunt.option('ang');
      // var path2 = grunt.option('mongo');
      // grunt.config.set('Path1', path1);
      // grunt.config.set('Path2', path2);
      // console.log(grunt.config('Path1') + ", " + grunt.config('Path2'));
    var taskList = [
        'concurrent',
        'shell:app',
        'shell:mongodb',
        'nodemon'
    ];
    grunt.task.run(taskList);
  });

  // grunt.registerTask('angular', function() {
  //   var path1 = grunt.option('ang');
  //   grunt.config.set('Path1', path1);
  //   console.log(grunt.config('Path1'));
  //   var taskList = ['shell:app'];
  //   grunt.task.run(taskList);
  // });

  grunt.registerTask('test', ['open:dev']);

  grunt.registerTask('conn', ['http:local']);

}