import React, { useEffect, useState } from 'react'
import { DateFormat } from '../../constants';
import { apiHelper } from '../../utils/apiHandler';

const AdminRecipientList = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
      const fetchData = async()=>{
          await apiHelper.get('/api/admin/allrecipients').then((res)=>setData(res.data));
         
      }
      fetchData();
  },[])
  
  
        return (
          <div className='w-full h-full py-4 flex flex-col gap-4'>
            <h1 className='py-4 text-c_blue font-bold text-xl'>Recipient List</h1>
      
        <div className="overflow-x-auto w-full rounded-sm">
          <table className="w-full bg-white shadow-md rounded-sm">
            <thead>
              <tr className="bg-c_blue text-white">
                <th className="py-3 px-4 text-left">Id</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email Address</th>
                <th className="py-3 px-4 text-left">Created At</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {
                data.map((items,index)=>{
                  return(
      <tr key={index} className="text-black">
                <td className="py-3 px-4">{index+1}</td>
                <td className="py-3 px-4 capitalize">{items.name}</td>
              
                <td className="py-3 px-4 ">{items.email}</td>
                <td className="py-3 px-4">{DateFormat(items.createdAt)}</td>
              </tr>
                  );
                })
              }
              
             
            </tbody>
          </table>
          
      
      </div>
              
          </div>
        )
}

export default AdminRecipientList