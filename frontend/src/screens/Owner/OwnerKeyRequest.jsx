import React, { useEffect, useState } from 'react'
import { DateFormat } from '../../constants';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const OwnerKeyRequest = () => {
    const [data,setData] = useState([]);
    const fetchData = async()=>{
        await apiHelper.get('/api/owner/keyReq').then((res)=>setData(res.data));
    }
    
    useEffect(()=>{
        fetchData();
  },[])

  const handleSend = async(id) =>{
    await apiHelper.put('api/owner/sendkey',{
        id:id
    }).then((res)=>{
        toast.success("Key Send Successfully!");
        fetchData();
    }).catch((err)=>{
        console.log(err)
        toast.error("Key Send Faild!");
    })

  }
  
  
        return (
          <div className='w-full h-full py-4 flex flex-col gap-4'>
            <h1 className='py-4 text-c_blue font-bold text-xl'>Key Request</h1>
      
        <div className="overflow-x-auto w-full rounded-sm">
          <table className="w-full bg-white shadow-md rounded-sm">
            <thead>
              <tr className="bg-c_blue text-white">
                <th className="py-3 px-4 text-left">Id</th>
                <th className="py-3 px-4 text-left">File Name</th>
                <th className="py-3 px-4 text-left">Recipient Name</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-center ">No. of Key Request</th>
                <th className="py-3 px-4 text-center">Status</th>
                
                
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {
                data.map((items,index)=>{
                  return(
      <tr key={index} className="text-black">
                <td className="py-3 px-4">{index+1}</td>
                <td className="py-3 px-4">{items?.file_data.originalname}</td>
                <td className="py-3 px-4 capitalize ">{items?.users.name}</td>
                <td className="py-3 px-4">{DateFormat(items.createdAt)}</td>
                <td className="py-3 px-4 text-center truncate ">{items?.isReq}</td> 
                <td className="py-3 px-4 text-center truncate max-w-[300px]">{
                items?.isReq == 1 ?
                <button onClick={()=>handleSend(items._id)} className='bg-c_blue text-white py-1.5 w-full rounded-sm'>
                    
                    Send</button>
                :
                <button  onClick={()=>handleSend(items._id)} className='bg-green-500 text-white py-1.5 w-full rounded-sm'>Again Send</button>
                }</td> 
              
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

export default OwnerKeyRequest