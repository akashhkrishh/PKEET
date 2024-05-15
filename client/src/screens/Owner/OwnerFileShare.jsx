import React, { useState } from 'react'

const OwnerFileShare = () => {


    const sample = [
        { email: "akash@gmail.com" },
        { email: "manooj@gmail.com" },
        { email: "ak@gmail.com" },
        { email: "arun@gmail.com" },
        { email: "merin@gmail.com" },
        { email: "amlalaesh@gmail.com" },
    ]

    const sampleD = [
        { filename: "Furiyr.txt", _id: "jdskkskskskapwieirir" },
        { filename: "sFuriyr.txt", _id: "jdskkskskskapwieirir" },
        { filename: "uriyr.txt", _id: "jdskkskskskapwieirir" },
        { filename: "ddsdFriyr.txt", _id: "jdskkskskskapwieirir" },
        { filename: "weFuriyr.txt", _id: "jdskkskskskapwieirir" },
        { filename: "fbgbbFuriyr.txt", _id: "jdskkskskskapwieirir" },

    ]
    const [formData, setFormData] = useState({
        file_id: '',
        recipient: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleClick = () => {
        alert(JSON.stringify(formData))
    };
    return (
        <div className='bg-red-200 h-full w-full flex items-center justify-center '>

            <div className='bg-white rounded-md flex flex-col gap-6 shadow-md border  p-4 w-[350px]'>
                <div className=' w-full'>
                        <h1 className='text-center text-2xl font-semibold'>Share File</h1>
                </div>

                <div className="">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an File</label>
                    <select name='file_id' onChange={handleInputChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                        <option value={''} disabled selected>Choose a File</option>
                        {
                            sampleD.map((items, index) => {
                                return (
                                    <option value={items._id}>{items.filename}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className="">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an Recipient</label>
                    <select name='recipient' onChange={handleInputChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">

                        <option value={''} disabled selected>Choose a Recipient</option>
                        {
                            sample.map((items, index) => {
                                return (
                                    <option value={items.email}>{items.email}</option>
                                );
                            })
                        }
                    </select>
                </div>



                <button onClick={handleClick} className='w-full bg-green-500 px-3 py-2 rounded-md text-white font-semibold hover:bg-green-600'>Share File</button>

            </div>

        </div>
    )
}

export default OwnerFileShare