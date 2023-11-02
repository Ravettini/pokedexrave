import React from 'react'
import { PokemonProvider } from './context/PokemonProvider'
import { AppRouter } from './AppRouter'

export const App = () => {
  return (
    <PokemonProvider> 
      <AppRouter/>
    </PokemonProvider>
  )
}

export default App

