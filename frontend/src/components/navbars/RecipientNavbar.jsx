import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import { User, UserCircle } from 'lucide-react';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';
import { RecipientNavList } from '../../constants';



const RecipientNavbar = () => {
    const navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.clear();
        toast.success("Logout Successfully")
        navigate("/");
    }
    const [userData,setData] = useState({
        name:"",
        email:"",
    });
    useEffect(()=>{
        const fetchName = async()=>{
            await apiHelper.get('/api/recipient').then((res)=>setData(res.data))
        }
        fetchName();
    },[])

    return (
        <nav className='h-full bg-secondary text-white flex flex-col justify-between p-4'>
            <div className=' gap-4 flex flex-col'>
            <h1 className=' text-2xl font-bold text-c_blue'>Recipient</h1>
            <div className='flex w-full h-[66px] rounded-sm'>
                <div className='h-full w-[66px] flex items-center justify-center'>
                    <UserCircle size={45} />
                </div>
                <div className='h-full w-full p-2 flex justify-center flex-col'>
                    <h1 className='capitalize font-semibold'>{userData?.name}</h1>
                    <h1 className='truncate text-sm w-[150px]'>{userData?.email}</h1>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {
                    RecipientNavList.map((items, index) => {
                        return (
                            <NavLink className={`hover:bg-c_blue px-2 py-2  rounded-sm`} key={index} to={items.path}>{items.title}</NavLink>
                        );
                    })
                }

            </div>
            </div>
             <button onClick={handleLogout} className='bg-red-800 text-white py-1.5 rounded-sm hover:bg-red-700'>Logout</button>

        </nav>
    )
}

export default RecipientNavbar