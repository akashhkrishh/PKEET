import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {apiHelper} from '../../utils/apiHandler'
import { useNavigate } from 'react-router-dom';

const OwnerFileUpload = () => {
    const navigate = useNavigate();
    const [isUploaded,setUploaded] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setFileContent(e.target.result);
        };
        reader.readAsText(file);

    };
    const handleSubmit = (e) => {
      e.preventDefault();
      if(selectedFile==null){
        return toast.error("File Must be Selected")
      }
      setUploaded(true)
      try {

          const form = new FormData();
          form.append('file', selectedFile);


          apiHelper.post('/api/owner/fileupload', form, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }).then(response => {
             
              toast.success('File Uploaded successfully!');
              navigate("/dashboard/owner/myfiles")
            
          })
      }
      catch (error) {
        console.log(error)
        setUploaded(false);
          toast.error("File Uploaded Failed!");
      }
  };
    return (
        <div className='h-full w-full flex items-center justify-center '>
            <div className='bg-secondary rounded-md flex flex-col gap-2 shadow-lg border border-c_blue h-[450px] p-4 w-[350px]'>

                <div>
                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="file_input">Upload file</label>
                    <input onChange={handleFileChange} className="block bg-c_blue w-full text-sm text-white rounded-md p-4 cursor-pointer  focus:outline-none " id="file_input" type="file" />

                </div>
                <div className='w-full text-sm break-words bg-white text-c_blue flex-1 overflow-auto p-2 border  rounded-md '>{fileContent}</div>
                <button onClick={handleSubmit}  className='w-full bg-c_blue px-3 py-2 rounded-md text-white font-semibold '>{isUploaded!=null?"Loading..":"Upload"}</button>

            </div>

        </div>
    )
}

export default OwnerFileUpload