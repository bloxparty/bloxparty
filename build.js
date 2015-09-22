var fs = require('fs')
var Browserify = require('browserify')
var Duo = require('duo')
var babelify = require('babelify')
var myth = require('duo-myth')

var b = Browserify()
var d = Duo(__dirname)

b.add('./lib/index.js', {debug: true})
  .transform(babelify.configure({
    jsxPragma: 'element',
    ignore: ['socket.io-client']
  }))
  .bundle()
  .on('error', function (err) {
    console.log('Error : ' + err.message)
  })
  .pipe(fs.createWriteStream('./build/index.js'));

d.entry('./lib/index.css')
  .use(myth())
  .write(function (err) {
    console.log(err)
  })