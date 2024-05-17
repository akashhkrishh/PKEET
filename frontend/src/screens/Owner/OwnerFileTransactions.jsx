import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import { DateFormat } from '../../constants';
const OwnerFileTransactions = () => {
  const [data,setData] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
        await apiHelper.get('/api/owner/filetransactions').then((res)=>setData(res.data))
    }
    fetchData();
},[])


      return (
        <div className='w-full h-full py-4 flex flex-col gap-4'>
          <h1 className='py-4 text-c_blue font-bold text-xl'>File Transactions</h1>
    
      <div className="overflow-x-auto w-full rounded-sm">
        <table className="w-full bg-white shadow-md rounded-sm">
          <thead>
            <tr className="bg-c_blue text-white">
              <th className="py-3 px-4 text-left">Id</th>
              <th className="py-3 px-4 text-left">File Name</th>
              <th className="py-3 px-4 text-left">Recipient Name</th>
              <th className="py-3 px-4 text-left">Hash Value</th>
              <th className="py-3 px-4 text-left">Upload At</th>
              
              <th className="py-3 px-4 text-center">File Size</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {
              data.map((items,index)=>{
                return(
    <tr key={index} className="text-black">
              <td className="py-3 px-4">{index+1}</td>
              <td className="py-3 px-4 font-semibold">{items.original.filename}</td>
            
              <td className="py-3 px-4 truncate capitalize max-w-[300px]">{items.receiver.name}</td> 
              <td className="py-3 px-4 truncate max-w-[300px]">{items.file_data.hashvalue}</td> 
              <td className="py-3 px-4">{DateFormat(items.createdAt)}</td>
              <td className="py-3 px-4 text-center">{items.original.filesize+" kb"}</td>
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

export default OwnerFileTransactions