import React from 'react'
import { NavLink } from 'react-router-dom';
import{ AdminNavList }from '../../constants/AdminNavList'

const RootNavbar = () => {
  return (
    <nav className='flex items-center justify-center h-full bg-green-500 text-white text-md font-semibold gap-4'>
      {
        AdminNavList.map((items,index)=>{
          return(
            <NavLink className={' hover:text-black px-2 py-1 rounded-md'} key={index} to={items.path}>{items.title}</NavLink>
          );
        })
      }
    </nav>
  )
}

export default RootNavbar