import { createStore } from 'redux'

import { last } from 'lodash'

import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const lastEventOfType = (eventType, events) =>
  last(events.filter(evt => evt.type === eventType))

const listOfPokemonsNames = events => {
  const lastResponseEvent = lastEventOfType('LIST_OF_POKEMONS_RETRIEVED', events)

  if(!lastResponseEvent)
    return []

  return lastResponseEvent.payload
}

const buildMyStore = (dependencies) => {
  const reducer = (events = [], type) => [...events, type]

  const enhancer = compose(
    applyMiddleware(
      thunk.withExtraArgument(dependencies)
    )
  )

  return createStore(reducer, undefined, enhancer)
}

const LOADER_ACTIVE = true
const LOADER_INACTIVE = false

const isEventDispatched = (eventType, events) => !!events.find(event => event.type === eventType)

const isLoadinglistOfPokemonsNames = events => {

  if(
    isEventDispatched('RETRIEVE_LIST_OF_POKEMONS', events) &&
    !isEventDispatched('LIST_OF_POKEMONS_RETRIEVED', events)
  )
    return LOADER_ACTIVE

  return LOADER_INACTIVE
}


const retrieveListOfPokemonsNames = () => async (dispatch, _, { api }) => {

  const response = await api.getListOfPokemons()

  dispatch({
    type: 'LIST_OF_POKEMONS_RETRIEVED',
    payload: response
  })
}


const retrieveListOfPokemons = () => ({
  type: 'RETRIEVE_LIST_OF_POKEMONS'
})


const listOfPokemonsRetrieved = pokemons => ({
  type: 'LIST_OF_POKEMONS_RETRIEVED',
  payload: pokemons
})

export {
  buildMyStore,
  isLoadinglistOfPokemonsNames,
  listOfPokemonsNames,
  retrieveListOfPokemonsNames,
  retrieveListOfPokemons,
  listOfPokemonsRetrieved
}