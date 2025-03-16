import React from 'react'
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'
import './App.css'
const App = () => {
  return (
    <div className='back-img w-full min-h-[100vh]'>
      <div className='background'>
    <Router>
    <Routes>
     <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>} />
<Route path='/login' element={<Login/>} />
    </Routes>
    </Router>
    </div>
    </div>
  )
}

export default App