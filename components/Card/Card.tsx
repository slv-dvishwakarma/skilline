import React from 'react'
import { GridBox } from '../GridBox';
import { SVGIcon } from '../Icons';


interface CardOptionalItem {
    heading: string;
    title: string;
    label: string;
}

interface CardItem {
    icon: string;
    title: string;
    label: string;
}

interface CardProps {
    carddata?: CardOptionalItem;
    card: CardItem[];
}

export const Card: React.FC<CardProps> = ({ carddata, card }) => {
  return (
    <div className='Carditem py-[50px]'>
        <div className='content text-center xl:w-[55%] lg:w-[80%] md:w-[90%] w-full m-auto space-y-6'>
            <h3 className='xl:text-[40px] lg:text-[40px] md:text-[40px] text-[35px] text-dark_text font-semibold'><span>{carddata?.title}</span> <span className='text-secondary'>{carddata?.heading}</span></h3>
            <p className='text-paragraph xl:text-lg lg:text-lg md:text-lg text-[20px] text-balance font-medium'>{carddata?.label}</p>
        </div>
        <GridBox columns={3} gap={5} className='xl:w-[80%] lg:w-[90%] md:w-full w-full  m-auto py-[80px] space-y-10 xl:space-y-0 lg:space-y-0 md:space-y-0 relative'>
            {card.map((item, index) => (
            <GridBox.GridItem key={index} columnMerge={1} className='text-center m-auto bg-white shadow-[4px_4px_29px_-5px_rgba(34,60,80,0.17)] xl:p-4 lg:p-4 md:p-2 p-4 rounded-[10px] h-full relative'>
                <SVGIcon className='absolute top-[-25px] inset-x-0 text-3xl w-[50px] h-[50px] flex items-center justify-center bg-secondary text-[white] rounded-[50%] m-auto' name={item.icon} />
                <div className='pt-[30px] space-y-5 px-5'>
                <h4 className='text-lg mt-[15px] text-black text-balance'>{item.title}</h4>
                <p className='text-[13px] text-balance'>{item.label}</p>
                </div>
            </GridBox.GridItem>
            ))}
        </GridBox>
    </div>
  )
}
