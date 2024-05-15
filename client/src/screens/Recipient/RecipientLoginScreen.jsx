import React, { useState } from 'react'
import CustomInputField from '../../components/CustomInputField'

const RecipientLoginScreen = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleClick = () => {
        alert(JSON.stringify(formData))
      };
  return (
    <div className='w-full h-full p-4 space-y-4'>
        <h1 className='font-bold text-xl text-center'>Login Here!</h1>
        <CustomInputField onChange={handleInputChange} type={'email'} value={formData.email} label={"email"} />
        <CustomInputField onChange={handleInputChange} type={'password'}  value={formData.password} label={"password"} />
        <button onClick={handleClick} className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600'>Login</button>

    </div>
  )
}

export default RecipientLoginScreen