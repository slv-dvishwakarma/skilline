import { SVGIcon } from '@/components/Icons';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface passwordItem {
    eye: string;
    eye_off: string;
}


interface InputItem {
    name: string;
    placeholder: string;
    label: string;
    icon: string;
}

interface SignUpPopupProps {
    username: InputItem;
    email: InputItem;
    password: InputItem;
    button: string;
    password_protection: passwordItem;
    handleClose: () => void;
}

export const SignUpPopup: React.FC<SignUpPopupProps> = ({ email, password, button, password_protection, username, handleClose  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, control, formState: { errors }, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
        reset();
        handleClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' mb-5 mt-3 space-y-4'>
            <div className='username'>
                <Controller
                    name={username.name}
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <div className='space-y-2'>
                            <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>{username.label}</label>
                            <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] px-2.5'>
                                <SVGIcon className='text-sm text-[#9D9D9D]' name={username.icon} />
                                <input
                                    type="text"
                                    className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                                    placeholder={username.placeholder}
                                    autoComplete="off"
                                    value={value}
                                    onChange={onChange}
                                />
                            </span>
                        </div>
                    )}
                />
                <div className='mt-[10px]'>
                    {errors[username.name] && <span className="text-[red] text-sm">Please Enter {username.placeholder}</span>}
                </div>
            </div>
            <div className='email_field'>
                <Controller
                    name={email.name}
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <div className='space-y-2'>
                            <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>{email.label}</label>
                            <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] px-2.5'>
                                <SVGIcon className='text-sm text-[#9D9D9D]' name={email.icon} />
                                <input
                                    type="email"
                                    className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                                    placeholder={email.placeholder}
                                    autoComplete="off"
                                    value={value}
                                    onChange={onChange}
                                />
                            </span>
                        </div>
                    )}
                />
                <div className='mt-[10px]'>
                    {errors[email.name] && <span className="text-[red] text-sm">Please Enter {email.placeholder}</span>}
                </div>
            </div>
            <div className='password_field'>
                <Controller
                    name={password.name}
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <div className='space-y-2'>
                            <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>{password.label}</label>
                            <span className='input-border flex items-center border rounded-md border-solid border-[#BEBEBE] px-2.5'>
                                <SVGIcon className='text-sm text-[#9D9D9D]' name={password.icon} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                                    placeholder={password.placeholder}
                                    autoComplete="off"
                                    value={value}
                                    onChange={onChange}
                                />
                                <button type='button' onClick={() => setShowPassword(!showPassword)}><SVGIcon name={showPassword ? password_protection.eye_off : password_protection.eye} /></button>
                            </span>
                        </div>
                    )}
                />
                <div className='mt-[10px]'>
                    {errors[password.name] && <span className="text-[red] text-sm">Please Enter {password.placeholder}</span>}
                </div>
            </div>
            <button className='text-[15px] bg-secondary rounded-[12px] text-white w-full px-5 py-2.5 mt-3'>{button}</button>
        </form>
    )
}
