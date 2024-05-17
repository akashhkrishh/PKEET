import React from 'react'
import { NavLink } from 'react-router-dom';
import { Admin, Owner, Recipient } from '../../assets/index'
const HomeScreen = () => {
  const ItemsList = [
        { title: "Admin", path:"/admin", image: Admin},
        { title: "Owner", path:"/owner", image: Owner},
        { title: "Recipient", path:"/recipient", image: Recipient},
    ];
  return (
   <>
 
    {
      ItemsList.map((items,index)=>{
        return(
          <div key={index} className='w-[250px] border p-2 hover:ring-green-600 hover:ring-1 ring-0 flex flex-col gap-2 rounded-md shadow-md '>
      <div className='w-full h-[250px] bg-white rounded-t-md  flex items-center justify-center'>
        <img className='rounded-md ' src={items.image} alt="" />

      </div>
      <div className='h-[50px] rounded-b-md cursor-pointer w-full hover:bg-green-600 bg-green-500 text-white flex items-center justify-center'>
        <NavLink className={'w-full flex items-center justify-center h-full font-semibold '} to={items.path}>{items.title}</NavLink>
      </div>
    </div>
        );
      })}
   </>
  )
}

export default HomeScreen