import React from 'react'
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';

interface NumberProps {
    label?: string;
    name: string;
    placeholder: string;
    control: Control<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
    required: boolean;
}

export const Number: React.FC<NumberProps> = ({ label, name, control, errors, placeholder, required }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                rules={{ required: required }}
                render={({ field: { onChange, value } }) => (
                    <div>
                        {label && <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>{label}</label>}
                        <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[8px]'>
                            <input
                                type="number"
                                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[35px] placeholder:text-[#9D9D9D] text-[14px] px-3 placeholder:text-[12px]"
                                placeholder={placeholder}
                                autoComplete="off"
                                value={value}
                                onChange={onChange}
                            />
                        </span>
                    </div>
                )}
            />
            {errors[name] &&
                <div className='mt-[8px]'>
                    <span className="text-red-500 text-sm">Please Enter {placeholder}</span>
                </div>
            }
        </>
    )
}
