import { readFileSync, writeFileSync } from 'fs'

export default {
  read(path) {
    const data = readFileSync(path)
    const pokemon = JSON.parse(data)
    return pokemon
  },

  find(type, pokemon) {
    const found = pokemon.filter(({ types }) => types.includes(type))
    return found
  },

  write(path, pokemon) {
    const data = JSON.stringify(pokemon, null, 2)
    writeFileSync(path, data)
  }
}

