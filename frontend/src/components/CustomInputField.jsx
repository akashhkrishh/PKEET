import React from 'react';

const CustomInputField = ({label, type, placeholder, value, onChange,onBlur,className,autoComplete }) => {
    function capitalize(str) {
        // Check if the string is empty or null
        if (!str) return '';
    
        // Capitalize the first letter and concatenate with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div>
            <label className="block font-medium ">{capitalize(label)}</label>
            <input
                // onBlur={onBlur}
                autoComplete={autoComplete}
                type={type}
                id={label}
                name={label}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`mt-2 p-2.5 border border-gray-300 rounded-md focus:outline-none  focus:border-c_blue block w-full sm:text-md ${className}`}
            />
        </div>
    );
};

export default CustomInputField;
