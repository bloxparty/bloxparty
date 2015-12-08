/*global describe, it */

import {Mock, assert} from 'deku-testutils'
import {GameList} from '../../app/home/game-list'

describe('Games', () => {
  const mock = Mock(GameList)

  it('returns the Games element', () => {
    const node = mock.render()
    assert.isNode(node, 'div')
    assert.hasAttribute(node, 'class', 'GameList')
  })
})
