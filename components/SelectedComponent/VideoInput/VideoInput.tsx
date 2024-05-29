import React from 'react'
import { Controller, useForm } from 'react-hook-form';


export const VideoInput = () => {

  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
      console.log(data);
      reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="video"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <div>
            <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>Enter Video Url</label>
            <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px]'>
              <input
                type="text"
                className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                placeholder="URL"
                autoComplete="off"
                value={value}
                onChange={onChange}
              />
            </span>
          </div>
        )}
      />
      <div className='mt-[10px]'>
        {errors["video"] && <span className="text-red-500 text-sm">Please Enter URL</span>}
      </div>
      <button type='submit' className='bg-secondary  text-white text-[15px] rounded-[80px] mt-2.5 px-[50px] py-2.5'>Add</button>
    </form>
  )
}
