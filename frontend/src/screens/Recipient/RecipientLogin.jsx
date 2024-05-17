import React, { useState } from 'react'
import CustomInputField from '../../components/CustomInputField';
import { useNavigate } from 'react-router-dom';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const RecipientLogin = () => {
    const navigate = useNavigate()
    const [formData, setForm] = useState({
        email:'',
        password:''
    })

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setForm({
            ...formData,
            [name]: value
        });
    };
    const handleClick = async() =>{
        await apiHelper.post("api/recipient/login",{
            email: formData.email,
            password:formData.password,
        }).then((res)=>{
            toast.success("Login Successfull!");
            localStorage.setItem('token',res.data.token)
            navigate("/dashboard/recipient")
            
        }).catch((err)=>{
            toast.error(err.response.data.message);
        })
    }
  return (
    <div className='w-full h-full flex flex-col gap-4 '>
        
         <CustomInputField 
            label={"email"}
            placeholder={"Enter the Email"}
            type={"email"}
            key={'email'}
            onChange={handleInputChange}
            className="text-black"
            value={formData.email}
        />
         <CustomInputField 
            label={"password"}
            placeholder={"Enter the Password"}
            autoComplete='off'
            type={"password"}
            key={'password'}
            onChange={handleInputChange}
            className="text-black"
            value={formData.password}
        />
        <button onClick={handleClick} className='py-2.5 w-[100px] bg-green-500 rounded-md text-white'>Login</button>

    </div>
  )
}

export default RecipientLogin