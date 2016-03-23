var gulp  = require('gulp');
var del = require('del');

// materialize
var sass = require('gulp-sass');
var fs = require('fs');
// react-materialize
var gbabel = require('gulp-babel');
var gutil = require('gulp-util');

var nukeconf = {};
var copyDir = '/tmp/';
var sourceDir = './source-native';

try{
    nukeconf = require('./.nukerc.json');
    copyDir = nukeconf.rndir;
    sourceDir = nukeconf.source;
}catch(e) {
    console.error('[Error] Please put your RN app dir in ./.nukerc.json. For example:\n{"rndir": "YOUR/RN/DIR/"}\n');
    return;
}

var config = {
    component: {
        src: sourceDir,
        dest: './lib'
    }
};

function buildTask() {
    function babelBundle () {
        return gbabel({
                "presets": ['react', 'es2015'],
                "plugins": ["transform-object-rest-spread", "transform-object-assign"]
            }).on('error',function(e){
                gutil.log(gutil.colors.magenta(e.message), "\n", gutil.colors.magenta(e.codeFrame));

                // Keep gulp from hanging on this task
                this.emit('end');
            })
    }
    return gulp.src(config.component.src + '/**/*.js')
            .pipe(babelBundle())
            .pipe(gulp.dest(config.component.dest));

}

function cleanTask(cb, params) {
    return del([config.component.dest], cb);
}

function hotcopy() {
    return gulp.src('./**/*')
    .pipe(gulp.dest(copyDir + 'node_modules/nuke'))
}

gulp.task('build', ['buildTask'], hotcopy);

gulp.task('buildTask', buildTask);

gulp.task('clean', cleanTask);

gulp.task('watch', ['default'], function() {
    gulp.watch(config.component.src + '/**/*', ['build']);
});

gulp.task('default', ['clean'], function() {
    return gulp.start(['build']);
});
