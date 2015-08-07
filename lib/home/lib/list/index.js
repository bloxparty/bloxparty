import bus from 'component/bus'
import element from 'dekujs/virtual-element'

function render (component, setState) {
  let {props} = component

  let items = props.items.map(function (item) {
    var css
    item.attributes = item.attributes || {}
    if (item.attributes.class) css = item.attributes.class
    if (css) css = css + ' List-listItem'
    else css = 'List-listItem'
    item.attributes.class = css
    return element('li', item.attributes, item.text)
  })

  return element('div', {class: 'List'}, [
    element('h2', {class: 'List-head'}, [props.title]),
    element('div', {class: 'List-listContainer'}, [
      element('ul', {class: 'List-list'}, items)
    ])
  ])
}

export default {render}
