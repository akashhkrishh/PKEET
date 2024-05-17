import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/navbars/AdminNavbar'

const AdminLayout = () => {
    return (
        <div className='w-screen h-screen fixed flex '>
          <nav className='w-[250px]  h-full overflow-auto'>
            <AdminNavbar />
          </nav>
          <section className="flex-1 p-4 h-full  bg-primary  text-white ">
            <Outlet />
          </section>
        </div>
      )
}

export default AdminLayout