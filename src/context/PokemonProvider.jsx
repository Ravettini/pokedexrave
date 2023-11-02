import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"


export const PokemonProvider = ({children}) => {

    const [AllPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setglobalPokemons] = useState([])
    const [offset, setoffset] = useState(0)


    //utilizar customhook -useform
    const {valueSearch, onInputChange, onResetform} = useForm({
        valueSearch:''
    })

    // estados para la aplicacion simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

// llamar 50 pokemones a la api

const getAllpokemons = async(limit = 50) => {
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`) 
    const data = await res.json();
    
    const promises = data.results.map(async(pokemon) =>{
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
    })

    const results = await Promise.all(promises)

    setAllPokemons([
        ...AllPokemons,
        ...results
    ])
    setLoading(false)
}

// llamar todos pokemones 

const getGlobalPokemons = async()=> {
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
    const data = await res.json();
    
    const promises = data.results.map(async(pokemon) =>{
        const res = await fetch(pokemon.url)
        const data = await res.json()
        return data
    })

    const results = await Promise.all(promises)

    setglobalPokemons(results)
}

// llamar a un pokemon por id

const getPokemonByID = async(id) => {
    const baseURL = 'https://pokeapi.co/api/v2/'

    const res = await fetch(`${baseURL}pokemon/${id}`)
    const data = await res.json()
    return data
}

useEffect(() => {
    getAllpokemons()
}, [offset])

useEffect(() => {
    getGlobalPokemons()
}, [])


//btn cargar mas 

const onClickLoadMore = () => {
    setoffset(offset + 50)
}

// filter function

const [typeSelected, setTypeSelected] = useState({
    grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
})

const [filteredPokemon, setfilteredPokemon] = useState([])

const handleCheckbox = e => {

    setTypeSelected({
        ...typeSelected,
        [e.target.name]: e.target.checked
    })

    if(e.target.checked){
        const filteredResults = globalPokemons.filter(pokemon => pokemon.types.map(type => type.type.name).includes(e.target.name)
        );
            setfilteredPokemon([...filteredPokemon, ...filteredResults])
    }
else{
        
            const filteredResults = filteredPokemon.filter(pokemon => !pokemon.types.map(type => type.type.name).includes(e.target.name)
            );
                setfilteredPokemon([...filteredResults])
        
}
}


return (
    <PokemonContext.Provider 
    value={{
        valueSearch,
        onInputChange,
        onResetform,
        AllPokemons,
        globalPokemons,
        getPokemonByID,
        onClickLoadMore,
        //loader
        loading,
        setLoading,
        //btn filter
        active,
        setActive,
        //filter container checkbox
        handleCheckbox,
        filteredPokemon
    }}>
        {children}
    </PokemonContext.Provider>
)

}