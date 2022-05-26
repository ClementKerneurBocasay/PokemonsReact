const PokemonsList = ({ isLoading, pokemons }) => {
  if(isLoading)
    return <p>Loading ...</p>

  if(pokemons?.length)
    return <ul>
      {pokemons.map(pokemon => <li key={pokemon.name}>{pokemon.name}</li>)}
    </ul>

  return <p>Pas de pokemons dans la liste</p>
}

export default PokemonsList