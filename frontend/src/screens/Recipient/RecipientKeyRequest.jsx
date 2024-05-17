import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DateFormat } from '../../constants';

const RecipientKeyRequest = () => {
  const [files,setFiles] = useState([]);
  const [keyReq,setReq] = useState([]);
  const navigate = useNavigate();
  const fetchData = async()=>{
    await apiHelper.get('/api/recipient/sharedfiles').then((res)=>setFiles(res.data));
    await apiHelper.get('/api/recipient/mykeyreq').then((res)=>setReq(res.data));
    
}

  useEffect(()=>{
    fetchData();
},[])


const [formData, setFormData] = useState({
    file_id: '',

});
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
const handleClick = async() => {

    if(formData.file_id == '' || formData.file_id == null){
        return toast.error("File must be selected!")
    }     
    await apiHelper.post("/api/recipient/getKey",{
        file_id:formData.file_id,
    }).then((res)=>{
        toast.success("File Shared Successfully!");
        fetchData();
    }).catch((err)=>{
        toast.error(err.response.data.message);
        
    })
};

const handleRequestAgain = async(id) =>{
  await apiHelper.put("/api/recipient/keyrereq",{file_id:id}).then((res)=>{
    toast.success("Key Request Send");
    fetchData();
  }).catch((err)=>{
    toast.error("Key Send Failed!");
  })

}
return (
    <div className=' h-full w-full flex items-center justify-center gap-4 '>
      <div className='w-2/3 rounded-sm break-words overflow-auto h-full text-black'>
      <div className='w-full h-full py-4 flex flex-col gap-4'>
          <h1 className='py-4 text-c_blue font-bold text-xl'>Uploaded Files</h1>
    
      <div className="overflow-x-auto w-full rounded-sm">
        <table className="w-full bg-white shadow-md rounded-sm">
          <thead>
            <tr className="bg-c_blue text-white">
              <th className="py-3 px-4 text-left">Id</th>
              <th className="py-3 px-4 text-left">File Name</th>
              <th className="py-3 px-4 text-left">Hash Value</th>
              
              
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-left">Created At</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {
              keyReq.map((items,index)=>{
                return(
    <tr key={index} className="text-black">
              <td className="py-3 px-4">{index+1}</td>
              <td className="py-3 px-4">{items.file_data.originalname}</td>
            
              <td className="py-3 px-4 truncate max-w-[200px]">{items.file_data.hashvalue}</td> 
              {/* <td className="py-3 px-4 truncate ">{items.isReq}</td>  */}
              <td className="py-3 px-4 text-center">{items.isSend ?
              <button onClick={()=>{handleRequestAgain(items._id)}} className='bg-c_blue py-1.5 px-2 rounded-sm text-white'>{"Req again"}</button>
              : "Not Send"}</td>
              <td className="py-3 px-4">{DateFormat(items.createdAt)}</td>
            </tr>
                );
              })
            }
            
           
          </tbody>
        </table>
        
    
    </div>
            
        </div>
       

      </div>


      <div className='rounded-sm border-r-0 border border-y-0  w-1/3 flex items-center justify-center h-full'>

        <div className='bg-secondary border-c_blue text-white rounded-md flex flex-col gap-6 shadow-md border  p-4 w-[350px]'>
            <div className=' w-full'>
                    <h1 className='text-center text-2xl font-semibold'>Key Request</h1>
            </div>

            <div className="">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium ">Select an File</label>
                <select name='file_id' defaultValue={''} onChange={handleInputChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  font-semibold outline-none focus:border-blue-500 block w-full p-2.5">

                    <option value={''} disabled selected>Choose a File</option>
                    {
                        files.map((items, index) => {
                            return (
                                <option key={index} value={items.file_data._id}>{items.file_data.originalname +" - "+items.sender.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            



            <button onClick={handleClick} className='w-full bg-c_blue px-3 py-2 rounded-md text-white font-semibold '>Send Key Request</button>

        </div>
      </div>


    </div>
)
}

export default RecipientKeyRequest