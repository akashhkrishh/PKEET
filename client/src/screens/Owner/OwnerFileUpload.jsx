import React, { useState } from 'react'

const OwnerFileUpload = () => {
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
    return (
        <div className='bg-red-200 h-full w-full flex items-center justify-center '>
            <div className='bg-white rounded-md flex flex-col gap-2 shadow-md border h-[450px] p-4 w-[350px]'>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">Upload file</label>
                    <input onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md p-4 cursor-pointer bg-green-50 focus:outline-none " id="file_input" type="file" />

                </div>
                <div className='w-full bg-green-50 flex-1 overflow-auto p-2 border  rounded-md '>{fileContent}</div>
                <button  className='w-full bg-green-500 px-3 py-2 rounded-md text-white font-semibold hover:bg-green-600'>Upload</button>

            </div>

        </div>
    )
}

export default OwnerFileUpload