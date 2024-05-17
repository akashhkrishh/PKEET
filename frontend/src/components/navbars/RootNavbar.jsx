import React from 'react'
import { RootNavList } from '../../constants';
import { NavLink } from 'react-router-dom';

const RootNavbar = () => {
   

    return (
        <nav className='h-full bg-secondary text-white flex flex-col justify-between p-4'>
           
            <div className='flex w-full items-center justify-center gap-2'>
                {
                    RootNavList.map((items, index) => {
                        return (
                            <NavLink className={`hover:bg-c_blue px-2 py-2  rounded-sm`} key={index} to={items.path}>{items.title}</NavLink>
                        );
                    })
                }

            </div>
           
        </nav>
    )
}

export default RootNavbar