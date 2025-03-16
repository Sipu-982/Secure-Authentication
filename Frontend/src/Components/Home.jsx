import React from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"
const Home = () => {
  return (
    <div className='flex justify-center items-center w-full min-h-[100vh]'>
         <div className='home'>
          <div className='my-5 flex justify-center items-center'> <h2 className='text-3xl text-blue-400 font-semibold'>Welcome To Home</h2></div>
       <div className='flex justify-center items-center'><Link to="/login" className='w-25 p-2 bg-blue-700 text-white  text-center text-lg'>Login</Link></div>
    </div>
    </div>
  )
}

export default Home