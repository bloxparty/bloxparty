import dom from 'virtual-element'

/**
 * Box Component
 */
export const name = 'Box'

/**
 * Render the Box element
 * @param  {Object} component
 * @return {VirtualNode}
 */
export function render ({props}) {
  const title = props.title
  const children = props.children

  return dom('div', {class: 'Box'}, [
    dom('div', {class: 'Box-head'}, [
      dom('span', {class: 'Box-title'}, title)
    ]),
    dom('div', {class: 'Box-content'}, [
      children
    ])
  ])
}

export default {name, render}
