import React from 'react'
import { Admin, Owner, Recipient } from '../../assets/index'
import { NavLink } from 'react-router-dom'

const HomeScreen = () => {
  const ItemsList = [
    { title: "Admin", path:"/admin", image: Admin},
    { title: "Owner", path:"/owner", image: Owner},
    { title: "Recipient", path:"/recipient", image: Recipient},
];
  return (
    <div className='w-full h-full flex items-center justify-center gap-4'>
      
      {
        ItemsList.map((items,index)=>{
          return(
            <div key={index} className='w-[250px] hover:ring-green-600 hover:ring-1 ring-0 h-[300px] rounded-md shadow-md bg-white'>
        <div className='w-full h-[250px]  border rounded-md  flex items-center justify-center'>
          <img className='rounded-md' src={items.image} alt="" />

        </div>
        <div className='h-[50px] rounded-b-md cursor-pointer w-full hover:bg-green-600 bg-green-500 text-white flex items-center justify-center'>
          <NavLink className={'w-full flex items-center justify-center'} to={items.path}>{items.title}</NavLink>
        </div>

      </div>
          );
        })
      }

    </div>
  )
}

export default HomeScreen