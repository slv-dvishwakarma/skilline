import React from 'react'
import { Controller, useForm } from 'react-hook-form';

export const TerminalInput = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="terminal"
        control={control}
        defaultValue=""
        rules={{ required: false }}
        render={({ field: { onChange, value } }) => (
          <div >
            <textarea
              id="terminal"
              placeholder="Please Enter Terminal Code"
              onChange={onChange}
              value={value}
              className='border w-full border-solid border-[#BEBEBE] h-[133px] rounded-md placeholder:text-[16px] placeholder:text-[#9D9D9D] px-3 pt-3 focus:outline-none'
            />
          </div>
        )}
      />
      <div className='mt-[10px]'>
        {errors["terminal"] && <span className="text-red-500 text-sm">Please Enter Code</span>}
      </div>
      <button type='submit' className='bg-secondary  text-white text-[15px] rounded-[80px] mt-2.5 px-[50px] py-2.5'>Add</button>
    </form>
  )
}
