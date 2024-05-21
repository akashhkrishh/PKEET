import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiHelper } from '../../utils/apiHandler';
import toast from 'react-hot-toast';

const RecipientFileView = () => {
  const [files,setFiles] = useState([]);
  const [download,setDownload] =useState(false)
  const [plaintext, setText] = useState(null);
  const navigate = useNavigate();
  const fetchData = async()=>{
    await apiHelper.get('/api/recipient/sharedfiles').then((res)=>setFiles(res.data))
    
}

  useEffect(()=>{
    fetchData();
    
},[])


const [formData, setFormData] = useState({
    fileId: '',
    secretkey:'',
});
const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};
const downloadFile = () => {
  const element = document.createElement("a");
  const file = new Blob([plaintext.data], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = plaintext.filename;
  document.body.appendChild(element); // Required for this to work in Firefox
  element.click();
  setDownload(false)
  setFormData({
    secretkey:'',
});
};
const handleClick = async() => {
    if(formData.fileId == '' || formData.fileId == null){
        return toast.error("File must be selected!")
    } 
    if(formData.secretkey == '' || formData.secretkey == null){
        return toast.error("Key not Entered!")
    } 
    




    await apiHelper.post("api/recipient/decrypt",{
        fileId:formData.fileId,
        secretkey: formData.secretkey
    }).then((res)=>{
        setText(res.data)
        if(res.data.TestResult){
          toast.success('Test Verifiablity Equality Passed')
        }
        setDownload(true)
        
        toast.success("Decrypted Successfully!");
      
      
    }).catch((err)=>{
        toast.error(err.response.data.message);
        navigate("/dashboard/recipient/myfiles")
        
        
    })
};
return (
    <div className=' h-full w-full flex items-center justify-center '>

        <div className='bg-secondary border-c_blue text-white rounded-md flex flex-col gap-6 shadow-md border  p-4 w-[350px]'>
            <div className=' w-full'>
                    <h1 className='text-center text-2xl font-semibold'>File Download</h1>
            </div>

            <div className="">
                <label htmlFor="fileId" className="block mb-2 text-sm font-medium ">Select File</label>
                <select name='fileId'  defaultValue={''} onChange={handleInputChange} id="fileId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  font-semibold outline-none focus:border-blue-500 block w-full p-2.5">

                    <option value={''} disabled selected>Choose a File</option>
                    {
                        files.map((items, index) => {
                            return (
                                <option key={index} value={items.file_data._id}>{items.file_data.originalname+'  -  '+items.sender.name}</option>
                            );
                        })
                    }
                </select>
            </div>
            <div className="">
                <label htmlFor="secretkey" className="block mb-2 text-sm font-medium">Enter the SecretKey</label>
                <input type="text" value={formData.secretkey} className='w-full text-black p-2 outline-none rounded-md ' name='secretkey' id='secretkey' onChange={handleInputChange} />
            </div>



            <button onClick={handleClick} className='w-full bg-c_blue px-3 py-2 rounded-md text-white font-semibold '>Decrypt File</button>

            {
              download && 
              <button onClick={downloadFile} className='w-full bg-c_blue px-3 py-2 rounded-md text-white font-semibold '>Download File</button>
            }

        </div>

    </div>
)
}

export default RecipientFileView