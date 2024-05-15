import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar } from '../components'

const AdminLayout = () => {
  return (
    <div className='w-screen h-screen flex flex-col'>
      <nav className='h-[10vh] w-full'>
        <AdminNavbar />
      </nav>
      <section className='h-[90vh] w-full'>
        <Outlet />
      </section>
    </div>
  )
}

export default AdminLayout