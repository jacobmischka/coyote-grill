/* eslint-env node */

const gulp = require('gulp');
const rename = require('gulp-rename');

const nodeModules = './node_modules/';

gulp.task('import:css', () => {
	let imports = [
		'normalize.css/normalize.css',
		'css-toggle-switch/dist/toggle-switch.css',
		'flickity/css/flickity.css'
	];

	imports = imports.map(file => nodeModules + file);

	gulp.src(imports)
		.pipe(rename(path => {
			path.basename = '_' + path.basename;
			path.extname = '.scss';
		}))
		.pipe(gulp.dest('./_sass/vendor'));
});
