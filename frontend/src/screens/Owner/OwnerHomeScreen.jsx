import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';

const OwnerHomeScreen = () => {
  const [name,setName] = useState([]);
  useEffect(()=>{
    const fetchName = async()=>{
        await apiHelper.get('/api/owner').then((res)=>setName(res.data))
    }
    fetchName();
},[])
  return (
    <div className=' h-full w-full flex  items-center justify-center'>
      <h1 className='text-4xl font-semibold'>Welcome Back ! <span className='capitalize text-c_blue'>{name?.name}</span></h1>
      </div>
  )
}

export default OwnerHomeScreen