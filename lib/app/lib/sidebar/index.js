import dom from 'virtual-element'

const name = 'Sidebar'

/**
 * Render Sidebar Component
 * TODO: Split up groups into separate lists
 * @param  {Object} component Component object
 * @return {Object} Deku component
 */
function render (component) {
  let props = component.props
  let listItems = []

  if (props.groups) {
    props.groups.forEach(function (group) {
      group.forEach(function (item, index) {
        let className = 'Sidebar-listItem'
        if (index === 0) className = 'Sidebar-listGroupTitle'
        let action = item.action || null
        let text = item.text || null

        if (action === null && index !== 0) className = className + ' is-disabled'

        let el = dom('li', {class: className, onClick: action}, [text])
        listItems.push(el)
      })
    })
  }

  return dom('div', {class: 'Sidebar'}, [
    dom('div', {class: 'Sidebar-content'}, [
      dom('div', {class: 'Sidebar-title'}, ['Blox Party']),
      dom('ul', {class: 'Sidebar-list'}, [listItems])
    ])
  ])
}

export default {render, name}
