var gulp = require('gulp')
var webserver  = require('gulp-webserver')
var sass = require('gulp-sass')
var webpack = require('gulp-webpack')
var named = require('vinyl-named')
var proxy = require('http-proxy-middleware')
var watch = require('gulp-watch')
var gulpSequence = require('gulp-Sequence')
//var $ = require('gulp-load-plugins')()
var del = require('del')
var rev = require('gulp-rev')

gulp.task('webserver',function () {
	gulp.src('./dev')
		.pipe(webserver({
			host: 'localhost',
			port: 8000,
			directoryListing: {
				enable: true,
				path: './dev'
			},
			livereload: true,
			
			middleware: [
				proxy('/api',{
					target: 'https://m.lagou.com/',
					changeOrign: true,
					pathRewrite: {
						'^/api': ''
					}
				})
			],
			middleware: [
				proxy('/vip',{
					target: 'http://localhost:9000/',
					changeOrign: true,
					pathRewrite: {
						'^/vip': ''
					}
				})
			]
		}))
})

gulp.task('copyhtml',function () {
	gulp.src('./src/*.html')
		.pipe(gulp.dest('./dev/'))
})

gulp.task('copyimage',function () {
	gulp.src('./src/images/**/*')
		.pipe(gulp.dest('./dev/images'))
})

gulp.task('packscss',function () {
	gulp.src('./src/styles/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('./dev/styles'))
})

gulp.task('packjs',function () {
	gulp.src('./src/scripts/*.js')
		.pipe(named())
		.pipe(webpack({
			output: {
				filename: '[name].js'
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'imports-loader',
						exclude: './node_modules'
					},
					{
						test: /\.string$/,
						loader: 'string-loader'
					}
				]
			}
		}))
		.pipe(gulp.dest('./dev/scripts'))
})

gulp.task('watch',function () {
	watch('./src/styles/**/*.scss',{
		event: ['add','change','unlink']
	},function () {
		gulpSequence('packscss')()
	})
	watch('./src/scripts/**/*.js',{
		event: ['add','change','unlink']
	},function () {
		gulpSequence('packjs')()
	})
	watch('./src/*.html',{
		event: ['add','change','unlink']
	},function () {
		gulpSequence('copyhtml')()
	})
	watch('./src/template/*.string',{
		event: ['add','change','unlink']
	},function () {
		gulpSequence('packjs')()
	})
	watch('.src/iamges/**/*',{
		event: ['add','change','unlink']
	},function () {
		gulpSequence('copyimage')()
	})
})

gulp.task('default',['webserver','packscss','packjs','copyhtml','copyimage','watch'],function () {
	
})
