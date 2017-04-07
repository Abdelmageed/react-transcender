const gulp = require('gulp');
import HubRegistry from 'gulp-hub';

const hub = new HubRegistry(['./gulp/**/!(util).js']);
gulp.registry(hub);

gulp.task('default', gulp.series(['backend:run:dev', 'browser-sync:dev', 'tdd']));

gulp.task('run:prod', gulp.series(['browser-sync:prod', 'backend:run:prod']));