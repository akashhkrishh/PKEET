import React from 'react'
import { Outlet } from 'react-router-dom'
import { RootNavbar } from '../components'

const RootLayout = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <nav className='h-[10vh] w-full'>
        <RootNavbar />
      </nav>
      <section className='h-[90vh] w-full'>
        <Outlet />
      </section>
    </div>
  )
}

export default RootLayout