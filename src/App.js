import { useEffect } from "react"
import { buildMyStore, listOfPokemonsNames } from "./core/pokemons";
import PokemonsList from "./ui/PokemonsList";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { retrieveListOfPokemonsNames, isLoadinglistOfPokemonsNames } from "./core/pokemons";

const api = {
  getListOfPokemons: async () => {
    await new Promise(res => setTimeout(res, 3000))
    return [
      { name: 'Pika' }
    ]
  }
}

const noLatencyApi = {
  getListOfPokemons: async () => {
    return [
      { name: 'Pika' }
    ]
  }
}

const prodApi = {
  getListOfPokemons: async () => {
    return (await (await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')).json()).results.map(poke => (
      { name: poke.name }
    ))
  }
}

const store = buildMyStore({
  api: noLatencyApi
})

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PokemonsListContainer />
      </div>
    </Provider>
  );
}

const PokemonsListContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveListOfPokemonsNames())
  }, [])

  const isLoading = useSelector(state => isLoadinglistOfPokemonsNames(state))
  const pokemons = useSelector(state => listOfPokemonsNames(state))

  return <PokemonsList
    isLoading={isLoading}
    pokemons={pokemons}
  />
}

export default App;
