import React, { useEffect, useState } from 'react'
import { Navbar } from './Components/Navbar';
import { Home } from './Views/Home';
import { Deleted } from './Views/Deleted';
import { Routes, Route } from 'react-router-dom';
import { Sent } from './Views/Sent';
import { SignIn } from './Views/SignIn';


export const App = () => {
  
  return (
  <>
    <header>
      <Navbar/>
    </header>
    <main className='container'>
      <Routes>
          <Route exact path='/' element={<Home /> } />
          <Route exact path='/sent' element={<Sent />} />
          <Route exact path='/deleted' element={<Deleted />} />
          <Route exact path='/signin' element={<SignIn />} />
      </Routes>

    </main>
    <footer></footer>
  </>
  )
}
