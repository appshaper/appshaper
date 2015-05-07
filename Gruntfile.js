module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        sourceFolder: 'src/',
        testFolder: 'test/',
        buildFolder: 'dist/',
        nodeModulesFolder: 'node_modules/',

        // https://github.com/gruntjs/grunt-contrib-clean
        clean: ['<%= buildFolder %>'],

        // https://github.com/sindresorhus/grunt-eslint
        eslint: {
            target: '<%= sourceFolder %>**/*.js',
            options: {
                config: 'eslint.json'
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'appshaper.templates',
                    amd: true,
                    processName: function(filePath) {
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1].split('.')[0];
                    },
                    wrapped: true,
                    node: true
                },
                files: {
                    '<%= testFolder %>/templates.js': ['<%= testFolder %>templates/**/*.hbs']
                }
            }
        },

        watch: {
            files: ['test/templates/**/*.hbs'],
            tasks: 'handlebars'
        },

        // Use to copy all main modules to dist folder
        copy_mate: {
            js: {
                options: {
                    type: 'recursive'
                },
                src: '<%= sourceFolder %>modules',
                destDir: '<%= buildFolder %>'
            }
        },

        // https://github.com/krampstudio/grunt-jsdoc
        jsdoc: {
            dist: {
                src: ['<%= sourceFolder %>modules/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'eslint',
        'handlebars',
        'copy_mate',
        'jsdoc'
    ]);

};
