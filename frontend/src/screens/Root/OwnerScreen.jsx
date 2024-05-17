import React, { useState } from 'react'
import { OwnerLogin, OwnerRegister } from '../Owner';


const OwnerScreen = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='bg-secondary w-[350px] rounded-sm p-4 flex flex-col gap-4'>
        <div className='w-full   rounded-sm flex justify-between'>
          <button onClick={() => { setLogin(true) }} className={`${isLogin ? "bg-green-500 text-white" : ""} py-2.5 font-semibold rounded-sm  w-1/2 h-full`}>Login</button>
          <button onClick={() => { setLogin(false) }} className={`${!isLogin ? "bg-green-500 text-white" : ""} font-semibold rounded-sm py-2.5  w-1/2 h-full`}>Register</button>
        </div>
        <hr />
        <div className='h-[56vh]'>
          {
            isLogin
              ?
              <OwnerLogin />
            
              :
              <OwnerRegister/>

          }

        </div>

      </div>
    </div>

  )
}

export default OwnerScreen