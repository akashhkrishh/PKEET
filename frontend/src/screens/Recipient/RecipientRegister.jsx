import React, { useState } from 'react'
import CustomInputField from '../../components/CustomInputField';
import toast from 'react-hot-toast';
import { apiHelper } from '../../utils/apiHandler';
import { useNavigate } from 'react-router-dom';

const RecipientRegister = () => {
    const navigate = useNavigate()
    const [formData, setForm] = useState({
        name:'',
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
        await apiHelper.post("api/recipient/create",{
            name:formData.name,
            email: formData.email,
            password:formData.password,
        }).then((res)=>{
            toast.success("Register Successfull!");
            navigate("/")
            
        }).catch((err)=>{
            toast.error(err.response.data.message);
        })
    }
  return (
    <div className='w-full h-full flex flex-col gap-4 '>
        <CustomInputField 
            label={"name"}
            placeholder={"Enter the Name"}
            type={"text"}
            key={'name'}
            onChange={handleInputChange}
            className="text-black"
            value={formData.name}
        />
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
        <button onClick={handleClick} className='py-2.5 w-[100px] bg-green-500 rounded-md text-white'>Register</button>

    </div>
  )
}

export default RecipientRegister