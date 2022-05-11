import React from 'react';

const PokemonsList = ({ isLoading, pokemons }) => {

  if(isLoading)
    return <p>Loading ...</p>

  if(pokemons?.length)
    return <ul>
      {pokemons.map(pokemon => <li>{pokemon.name}</li>)}
    </ul>

  return <p>Pas de pokemons dans la liste</p>
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'PokemonApp/PokemonsList',
  component: PokemonsList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <PokemonsList {...args} />;

const anExempleWithArgs = (args) => {
  const template = Template.bind({})
  template.args = args

  return template
}

export const IsLoading = anExempleWithArgs({ isLoading: true })

export const Empty = anExempleWithArgs({})

export const WithOnePokemon = anExempleWithArgs({
  pokemons: [
    { name: 'pikachu' }
  ]
})

export const WithThreePokemons = anExempleWithArgs({
  pokemons: [
    { name: 'pikachu' },
    { name: 'carapuce'},
    { name: 'salameche' }
  ]
})