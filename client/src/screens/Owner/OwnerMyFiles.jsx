import React from 'react'

const OwnerMyFiles = () => {
    const sample = [
        {filename:"Fruits.txt", secretkey:"829373933393", hashvalue:"SHDHDJSK2B2B3SOAJP244SKVLDNW2233", createdAt:"2023-29-02", download:'4' },
        {filename:"Fruits.txt", secretkey:"829373933393",  hashvalue:"SHDHDJSK2B2B3SOAJP244SKVLDNW2233", createdAt:"2023-29-02", download:'4' },
        {filename:"Fruits.txt", secretkey:"829373933393",  hashvalue:"SHDHDJSK2B2B3SOAJP244SKVLDNW2233", createdAt:"2023-29-02", download:'4' },
        {filename:"Fruits.txt", secretkey:"829373933393", hashvalue:"SHDHDJSK2B2B3SOAJP244SKVLDB2B3SOAJP244SKVLDB2B3SOAJP244SKVLDB2B3SOAJP244SKVLDB2B3SOAJP244SKVLDNW2233", createdAt:"2023-29-02", download:'4' },
        {filename:"Fruits.txt",secretkey:"829373933393", hashvalue:"SHDHDJSK2B2B3SOAJP244SKVLDNW2233", createdAt:"2023-29-02", download:'4' },
        {filename:"Fruits.txt",secretkey:"829373933393",  hashvalue:"SHDHDJSK2B2B3SOAJP244SKVLDNW2233", createdAt:"2023-29-02", download:'4' },
      ];
    
      return (
        <div className='w-full h-full bg-slate-500 px-[100px] py-4'>
    
      <div className="overflow-x-auto w-full">
        <table className="w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Id</th>
              <th className="py-3 px-4 text-left">File Name</th>
              <th className="py-3 px-4 text-left">Hash Value</th>
              <th className="py-3 px-4 text-left">Secret Key</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-center">Download</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {
              sample.map((items,index)=>{
                return(
    <tr key={index} className="">
              <td className="py-3 px-4">{index+1}</td>
              <td className="py-3 px-4">{items.filename}</td>
            
              <td className="py-3 px-4 truncate max-w-[300px]">{items.hashvalue}</td> 
              <td className="py-3 px-4 truncate max-w-[300px]">{items.secretkey}</td> 
              <td className="py-3 px-4">{items.createdAt}</td>
              <td className="py-3 px-4 text-center">{items.download}</td>
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

export default OwnerMyFiles