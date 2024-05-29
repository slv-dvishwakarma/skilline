import React from 'react'
import { Controller, useForm } from 'react-hook-form';

export const DescriptionInput = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <div >
            <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>Enter Description</label>
            <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
            <textarea
              id="description"
              placeholder="Please Enter Description"
              onChange={onChange}
              value={value}
              className='form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[200px] placeholder:text-[#9D9D9D] text-[14px] p-3'
            />
            </span>
          </div>
        )}
      />
      <div className='mt-[10px]'>
        {errors["description"] && <span className="text-red-500 text-sm">Please Enter Description</span>}
      </div>
      <button type='submit' className='bg-secondary  text-white text-[15px] rounded-[80px] mt-2.5 px-[50px] py-2.5'>Add</button>
    </form>
  )
}
