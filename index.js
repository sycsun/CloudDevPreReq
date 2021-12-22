import pokedex from './lib/pokedex.js'

const type = 'fire' // fire, water, grass, electric, etc.

try {
  console.log(`Looking for ${type} pokemon...`)
  const pokemon = pokedex.read('./data/pokemon.json')
  const found = pokedex.find(type, pokemon)
  pokedex.write(`./data/${type}.json`, found)
  console.log(`... done!`)
} catch (error) {
  console.error(error)
}

