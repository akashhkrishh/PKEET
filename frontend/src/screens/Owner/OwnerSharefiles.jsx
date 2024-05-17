import React, { useEffect, useState } from 'react'
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OwnerSharefiles = () => {
  const [files,setFiles] = useState([]);
  const [recipient,setRecipient] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
        await apiHelper.get('/api/owner/myfiles').then((res)=>setFiles(res.data))
        await apiHelper.get('/api/owner/getRecipients').then((res)=>setRecipient(res.data))
    }
    fetchData();
},[])


const [formData, setFormData] = useState({
    file_id: '',
    receiver: ''
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
    if(formData.receiver == '' || formData.receiver == null){
        return toast.error("Recipient must be selected!")
    }
    
    await apiHelper.post("/api/owner/sharefiles",{
        file_id:formData.file_id,
        receiver:formData.receiver,
    }).then((res)=>{
        toast.success("File Shared Successfully!");
        navigate("/dashboard/owner/filetransaction")
    }).catch((err)=>{
        toast.error(err.response.data.message);
        navigate("/dashboard/owner/filetransaction")
    })
};
return (
    <div className=' h-full w-full flex items-center justify-center '>

        <div className='bg-secondary border-c_blue text-white rounded-md flex flex-col gap-6 shadow-md border  p-4 w-[350px]'>
            <div className=' w-full'>
                    <h1 className='text-center text-2xl font-semibold'>Share File</h1>
            </div>

            <div className="">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium ">Select an File</label>
                <select name='file_id' defaultValue={''} onChange={handleInputChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  font-semibold outline-none focus:border-blue-500 block w-full p-2.5">

                    <option value={''} disabled selected>Choose a File</option>
                    {
                        files.map((items, index) => {
                            return (
                                <option key={index} value={items._id}>{items.originalname}</option>
                            );
                        })
                    }
                </select>
            </div>
            <div className="">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium">Select an Recipient</label>
                <select name='receiver' defaultValue={''} onChange={handleInputChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block w-full p-2.5">

                    <option value={''} disabled selected>Choose a Recipient</option>
                    {
                        recipient.map((items, index) => {
                            return (
                                <option key={index} value={items._id}>{items.email}</option>
                            );
                        })
                    }
                </select>
            </div>



            <button onClick={handleClick} className='w-full bg-c_blue px-3 py-2 rounded-md text-white font-semibold '>Share File</button>

        </div>

    </div>
)
}

export default OwnerSharefiles