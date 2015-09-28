import element from 'virtual-element'

const name = 'Sidebar'

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

        let el = element('li', {class: className, onClick: action}, [text])
        listItems.push(el)
      })
    })
  }

  return element('div', {class: 'Sidebar'}, [
    element('div', {class: 'Sidebar-content'}, [
      element('div', {class: 'Sidebar-title'}, ['Blox Party']),
      element('ul', {class: 'Sidebar-list'}, [listItems])
    ])
  ])
}

export default {render, name}
