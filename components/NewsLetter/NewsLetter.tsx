"use client"
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

interface EmailProps {
    name: string;
    label?: string;
    placeholder: string;
    button: string;
}

export const NewsLetter: React.FC<EmailProps> = ({ name, placeholder, button, label }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
        reset();
    };

    return (
        <>
            {label && (<span className='text-[25px] text-[#b2b3cf] flex justify-center mx-0 my-[25px] text-center'>{label}</span>)}
            <form onSubmit={handleSubmit(onSubmit)} className='xl:flex lg:flex md:flex block items-center justify-between xl:space-y-0 lg:space-y-0 md:space-y-0 space-y-5'>
                <Controller
                    name={name}
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <input
                            type="email"
                            className="bg-transparent border text-white h-[43px] xl:w-3/5 lg:w-3/5 md:w-3/5 w-full px-5 py-2 rounded-[20px] border-solid border-[#83839a]"
                            placeholder={placeholder}
                            autoComplete="off"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <button type='submit' className='bg-secondary h-[43px] px-7 rounded-[30px] text-white xl:w-[30%] lg:w-[30%] md:w-[30%] w-full'>{button}</button>
                <div className='mt-[10px]'>
                    {errors[name] && <span className="text-red-500 text-sm">Please Enter {placeholder}</span>}
                </div>
            </form>
        </>
    )
}
