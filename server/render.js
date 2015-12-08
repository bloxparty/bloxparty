import {readFileSync as read} from 'fs'
import {resolve} from 'path'

const layout = read(resolve(__dirname, '../index.html'), 'utf8')

/**
 * Render the initial layout
 * @param  {Request}   req  Server request object
 * @param  {Response}   res  Server response object
 * @param  {Function} next Middleware next function
 * @return {Function}        Returns `next()`
 */
module.exports = function (req, res, next) {
  res.send(layout)
  return next()
}
