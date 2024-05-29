import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

interface TextareaProps {
    name: string;
    label?: string;
    placeholder: string;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
}

export const TextArea: React.FC<TextareaProps> = ({ name, placeholder, label, control, errors }) => {
    return (
        <div className='textarea mt-[12px]'>
            {label && <label className='text-[#777777] text-[12px]'>{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{ required: false }}
                render={({ field: { onChange, value } }) => (
                    <div className={` ${label ? "mt-2.5" : ""}`}>
                        <textarea 
                        id={name}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        className='border w-full border-solid border-[#BEBEBE] h-[133px] rounded-md placeholder:text-[16px] placeholder:text-[#9D9D9D] px-3 pt-3 focus:outline-none'
                        />
                    </div>
                )}
            />
        </div>
    )
}
