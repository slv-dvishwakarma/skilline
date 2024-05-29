import Link from 'next/link';
import React from 'react'

interface ButtonsItem {
    name: string;
    url: string;
}

interface PracticeItem {
    title: string;
    label: string;
    plans: string[];
    buttons: ButtonsItem[];
}

interface PracticeProps {
    practice: PracticeItem;
}

export const Practice: React.FC<PracticeProps> = ({ practice }) => {
    return (
        <div className='Practice py-[50px]'>
            <h3 className='text-secondary text-[40px] font-semibold text-center'>{practice.title}</h3>
            <div className='xl:w-[75%] lg:w-[80%] md:w-[90%] w-full m-auto bg-primary shadow-[0_0.5em_1em_-0.125em_#0a0a0a1a,0_0_0_1px_#0a0a0a05] rounded-md xl:p-[30px] lg:p-[30px] md:p-[30px] p-[15px] mt-[30px]'>
                <h4 className='text-dark_text xl:text-3xl lg:text-3xl md:text-3xl text-[23px] text-center font-medium'>{practice.label}</h4>
                <ul className='xl:space-y-2 lg:space-y-2 md:space-y-2 space-y-5 mt-5 xl:pl-[30px] lg:pl-[30px] md:pl-[30px] pl-[0px]'>
                    {practice.plans.map((item, index) => (
                        <li key={index} className='before:content-["\2713"] before:font-black before:text-[green] before:text-[22px] before:mr-[13px] text-xl text-common'>{item}</li>
                    ))}
                </ul>
            </div> 

            <div className='xl:w-[60%] lg:w-[90%] md:w-full w-full mx-auto my-[30px] flex justify-between flex-wrap xl:space-y-0 lg:space-y-0 md:space-y-0 space-y-4'>
                {practice.buttons.map((item, index) => (
                    <Link href={item.url} key={index} className='bg-secondary  text-white text-[15px] rounded-[80px] px-[30px] py-2 shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] hover:bg-white hover:text-black xl:w-3/12 lg:w-3/12 md:w-3/12 w-full text-center'>{item.name}</Link>
                ))}
                
            </div>
        </div>
    )
}
