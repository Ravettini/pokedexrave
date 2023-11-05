import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { HomePage, PokemonPage, SearchPage,  } from './pages'
import Heropage from './pages/HeroPage'

export const AppRouter = () => {
  return (
    <Routes> 
            <Route index element={<Heropage/>}/>
        <Route path='/' element={<Navigation/>}>
            <Route path='/HomePage'  element={<HomePage/>}/>
            <Route path='pokemon/:id' element={<PokemonPage/>}/> 
            <Route path='search' element={<SearchPage/>}/>
        </Route>
         <Route path='*' element={<Navigate to='/'/>} />
    </Routes>
  )
}
