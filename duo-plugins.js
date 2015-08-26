var babel = require('duo-babel')
var myth = require('duo-myth')

module.exports = [
  babel({
    jsxPragma: 'element',
    ignore: ['components/automattic-socket.*@*/**.js']
  }),
  myth()
]