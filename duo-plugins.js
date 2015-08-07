var babel = require('duo-babel')
var myth = require('duo-myth')

module.exports = [
  babel({
    onlyLocals: true,
    jsxPragma: 'element'
  }),
  myth()
]