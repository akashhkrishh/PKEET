import React, { useState } from 'react'
import { AdminLoginScreen, AdminRegisterScreen } from '../Admin';

const AdminScreen = () => {
  const [isLogin, setLogin] = useState(true);

  return (
    <div className='w-full h-full  flex items-center justify-center'>
      <div className='bg-white h-[450px] w-[350px] rounded-md shadow-md border'>
        <div className='w-full h-[12%] text-sm rounded-t-md border-b'>
          <button onClick={() => { setLogin(true) }} className={`${isLogin ? "bg-green-500 text-white" : ""} font-semibold rounded-tl-md  w-1/2 h-full`}>Login</button>
          <button onClick={() => { setLogin(false) }} className={`${!isLogin ? "bg-green-500 text-white" : ""} font-semibold rounded-tr-md  w-1/2 h-full`}>Register</button>
        </div>
        <div className='h-[88%] w-full'>
          {
            isLogin
              ?
              <AdminLoginScreen />
              :
              <AdminRegisterScreen />
          }
        </div>

      </div>
    </div>
  )
}

export default AdminScreen