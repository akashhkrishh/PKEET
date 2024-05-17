import React from 'react'
import { Outlet } from 'react-router-dom'
import { RecipientNavbar } from '../components'

const RecipientLayout = () => {
    
    return (
        <div className='w-screen h-screen fixed flex '>
          <nav className='w-[250px]  h-full overflow-auto'>
            <RecipientNavbar />
          </nav>
          <section className="flex-1 p-4 h-full  bg-primary  text-white ">
            <Outlet />
          </section>
        </div>
      )
}

export default RecipientLayout