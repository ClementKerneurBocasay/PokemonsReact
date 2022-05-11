//List des pokemons
//Pagination
import { it, expect, describe, beforeEach } from '@jest/globals'

import {
  listOfPokemonsNames,
  buildMyStore,
  isLoadinglistOfPokemonsNames,
  retrieveListOfPokemonsNames,
  retrieveListOfPokemons,
  listOfPokemonsRetrieved
} from '../core/pokemons'

const buildMyStoreWithPokemons = pokemons => {
  const api = {
    getListOfPokemons: async () => pokemons
  }

  return buildMyStore({ api })
}

describe('Feature Pokemons', () => {
  let store;
  beforeEach(() => {
    store = buildMyStoreWithPokemons([])
  })

  describe('retrieve the list of names of pokemons', () => {

    it('an empty list', () => {
      expect(listOfPokemonsNames(store.getState())).toEqual([])
    })

    it('one pokemon', () => {
      store.dispatch(listOfPokemonsRetrieved([
        aPokemon('pikachu')
      ]))

      expect(listOfPokemonsNames(store.getState())).toEqual([
        aPokemon('pikachu')
      ])
    })

    it('two pokemons', () => {
      store.dispatch(listOfPokemonsRetrieved([
        aPokemon('pikachu'),
        aPokemon('dracofeu')
      ]))

      expect(listOfPokemonsNames(store.getState())).toEqual([
        aPokemon('pikachu'),
        aPokemon('dracofeu')
      ])
    })
  })

  describe('loader', () => {
    it('loader is displayed when list of pokemons is retrieved', () => {
      store.dispatch(retrieveListOfPokemons())

      expect(isLoadinglistOfPokemonsNames(store.getState())).toEqual(true)
    })

    it('loader is not displayed when list of pokemons is being retrieved', () => {
      store.dispatch(retrieveListOfPokemons())

      store.dispatch(listOfPokemonsRetrieved([
        aPokemon('pikachu')
      ]))

      expect(isLoadinglistOfPokemonsNames(store.getState())).toEqual(false)
    })
  })

  const aPokemon = name => ({ name })

  describe('fetching a list of pokemons from a web service', () => {
    it('with two pokemons', async () => {
      const store = buildMyStoreWithPokemons([
        aPokemon('pikachu'),
        aPokemon('dracofeu')
      ])

      await store.dispatch(retrieveListOfPokemonsNames())

      expect(listOfPokemonsNames(store.getState())).toEqual([
        aPokemon('pikachu'),
        aPokemon('dracofeu')
      ])
    })

    it('with one pokemons', async () => {
      const store = buildMyStoreWithPokemons([
        aPokemon('pikachu')
      ])

      await store.dispatch(retrieveListOfPokemonsNames())

      expect(listOfPokemonsNames(store.getState())).toEqual([
        aPokemon('pikachu')
      ])
    })
  })
})