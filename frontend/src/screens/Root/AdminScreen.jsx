import React, { useState } from 'react'

import AdminLogin from '../Admin/AdminLogin';


const AdminScreen = () => {
  
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='bg-secondary w-[350px] rounded-sm p-4 flex flex-col gap-4'>
        <div className='w-full   rounded-sm flex justify-between'>
          <h2 className='text-2xl font-semibold'>Login</h2>
        </div>
        <hr />
        <div className='h-[56vh]'>
          
              
              <AdminLogin />
            
           

        </div>

      </div>
    </div>

  )
}

export default AdminScreen