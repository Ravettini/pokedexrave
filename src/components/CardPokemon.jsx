import React from 'react'
import { Link } from 'react-router-dom'
import pokeatras from '../assets/img/pokeatras.png'

export const CardPokemon = ({pokemon}) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className={`card-pokemon ${pokemon.types[0].type.name}`}>
      <div className="front">
      <h3>{pokemon.name}</h3>
      <span className='pokemon-id'>N° {pokemon.id}</span>
      <div className='card-img'>
        <img
          src={pokemon.sprites.front_default}
          alt={`Pokemon ${pokemon.name}`}
        />
      </div>
      <div className='card-info'>
        <div className='card-types'>
          {pokemon.types.map(type => (
            <span key={type.type.name} className={type.type.name + ' type'}>
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="habilidades">
          <p>Hp {pokemon.stats[0].base_stat}</p>
          <p>Attack {pokemon.stats[1].base_stat}</p>
          <p>Defence {pokemon.stats[2].base_stat}</p>
        </div>
        <br />
        <div className="habilidades2">
          <p>Special Attack {pokemon.stats[3].base_stat} </p>
          <p>Special defense {pokemon.stats[4].base_stat}</p>
          <p>Speed {pokemon.stats[5].base_stat}</p>
        </div>
        </div>
      </div>
      <div className="back">
        <h1></h1>
      </div>
    </Link>
  )
}