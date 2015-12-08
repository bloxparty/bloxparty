import array from 'array'
let games = null
let players = null

export default function db () {
  if (!games) games = array()
  if (!players) players = array()

  return {
    games,
    players
  }
}
