import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { CardPokemon } from './CardPokemon'
import { Loader } from './Loader'

export const PokemonList = () => {

  const {AllPokemons, loading, filteredPokemon} = useContext(PokemonContext)

  return (
    <>
    {

        loading ? (
          <Loader/>
        ) : (
        <div className="card-list-pokemon container">
          {
            filteredPokemon.length ? (
              <>
              {filteredPokemon.map(pokemon => (  <CardPokemon pokemon={pokemon} key={pokemon.id}/> ))}
              </>
            ) : (
              <>
              {AllPokemons.map(pokemon => (  <CardPokemon pokemon={pokemon} key={pokemon.id}/> ))}
              </>
              )
          }
    </div>
        )
    }
    </>
  );
};
