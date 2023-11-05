import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { Loader } from '../components/Loader'
import { useParams } from 'react-router-dom'

export const PokemonPage = () => {
    const {getPokemonByID} = useContext(PokemonContext)

    const [loading, setloading] = useState(true)
    const [pokemon, setpokemon] = useState({})

    const {id} = useParams()

    const fetchPokemon = async(id) => {
        const data = await getPokemonByID(id)
        setpokemon(data)
        setloading(false)
    }

    useEffect(() => {
      fetchPokemon(id)
    
    }, [])
    

  return (
    <main className="container main-pokemon">
        {
            loading ? (
                <Loader/>
            ) : (
                <> 
						<div className='container-info-pokemon'>
							<div className='nombre'> 
							<span className='number-pokemon'>#{pokemon.id}</span>
							<h1>{(pokemon.name)}</h1>  
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{type.type.name}
									</span>
								))}
							</div>
							</div>
						
							<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.dream_world.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
							</div>
						
					<div className='container-stats'>
						<h1 style={{fontSize:'30px'}}>Estadísticas</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span>Hp</span>
								
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat} / {pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Attack</span>
								
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Defense</span>
								
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Attack</span>
								
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Special Defense</span>
								
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span>Speed</span>
								
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>
					</div>

                </>
            )
        }
    </main>
  )
}
