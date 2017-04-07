import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import jasmine from 'gulp-jasmine';
import watch from 'gulp-watch';

require('../jasmine/helpers/setup.js');
//const TestServer = require('karma').Server;
//
//gulp.task('test', function (done) {
//    const server =  new TestServer({
//        configFile: path.join(__dirname, '..', 'karma.conf.js')
//    });
//
//    server.on('browser_error', function (browser, err){
//        gutil.log('Karma Run Failed: ' + err.message);
//        throw err;
//    });
//
//    server.on('run_complete', function (browsers, results){
//        if (results.failed) {
//            throw new Error('Karma: Tests Failed');
//        }
//        gutil.log('Karma Run Complete: No Failures');
//        done();
//    });
//
//    server.start();
//});
//
//gulp.task('tdd', function (done) {
//  const server =  new TestServer({
//        configFile: path.join(__dirname, '..', 'karma.conf.js')
//    });
//  server.start();
//  done();
//});

// This assures the .babelrc dev config (which includes
// hot module reloading code) doesn't apply for tests.
// Setting NODE_ENV to test instead of production because setting it to production will suppress error messaging
// and propType validation warnings.
//process.env.NODE_ENV = 'test';

function test (done) {
   gulp.src('src/**/*.spec.js')
  .pipe(jasmine({
    conf: require('../jasmine/conf.json'),
    errorOnFail: false
  })
    .on('jasmineDone', ()=> {
      done();
    }));
}

gulp.task('test', (done)=> {
 test(done);
});

gulp.task('tdd', (done)=> {
  test(done);
  gulp.watch('src/**/*.js', gulp.series('test'));
  done();
});

