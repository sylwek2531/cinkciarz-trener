'use strict';
var modRewrite = require('connect-modrewrite');
var serveStatic = require('serve-static');

module.exports = function (grunt)
{

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }, files: ['app/**/*.html', 'app/**/*.js', 'app/**/*.css']
            }
        }, connect: {
            options: {
                port: 9000, livereload: 35729, hostname: '192.168.2.185'
            }, livereload: {
                options: {
                    open: true, middleware: function (connect)
                    {
                        return [modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.ttf|\\.woff|(\\api.+)$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')), serveStatic('app'),
                            require('grunt-connect-proxy/lib/utils').proxyRequest];
                    }
                }
            },proxies: [{
                context: '/api', host: 'localhost', port: 3000, changeOrigin: true
            }]

        }, karma: {
            options: {
                configFile: 'test/karma.conf.js'
            }, unit: {
                singleRun: true
            }, dev: {
                singleRun: false
            }
        }, jshint: {
            default: {
                options: {
                    jshintrc: true
                }, files: {
                    src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js']
                }
            }, verify: {
                options: {
                    jshintrc: true, reporter: 'checkstyle', reporterOutput: 'target/jshint.xml'
                }, files: {src: ['app/**/*.js', 'test/**/*.js', '!app/bower_components/**/*.js']}
            }
        }, 'gh-pages': {
            options: {
                base: 'app'
            }, src: ['**']
        }
    });

    grunt.registerTask('serve', function ()
    {
        grunt.task.run(['configureProxies', 'connect:livereload', 'watch']);
    });

    grunt.registerTask('verify', ['jshint:verify', 'karma:unit']);

    grunt.registerTask('test:dev', ['karma:dev']);

    grunt.registerTask('default', ['serve']);
};
