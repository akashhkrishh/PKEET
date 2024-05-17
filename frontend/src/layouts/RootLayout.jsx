import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { RootNavbar } from '../components'

const RootLayout = () => {
    
  return (
    <div className='bg-primary text-c_blue w-screen fixed h-screen'>
        <nav className='h-[10vh] bg-secondary w-full'>
          <RootNavbar/>
        </nav>
        <section className='h-[90vh] w-full flex gap-4 items-center justify-center'>
         <Outlet/>
        </section>
       
    </div>
  )
}

export default RootLayout