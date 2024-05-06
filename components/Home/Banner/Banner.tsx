"use client"
import { GridBox } from '@/components/GridBox'
import { SVGIcon } from '@/components/Icons';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface CardItem {
    icon: string;
    title: string;
    label: string;
}

interface BannerItem {
    heading: string;
    title: string;
    label: string;
    image: string;
    join_button: string;
    join_url: string;
    watch: string;
    youtube_link: string;
}

interface BannerProps {
    banner: BannerItem;
    calander: CardItem;
    placement: CardItem;
}

export const Banner: React.FC<BannerProps> = ({ banner, calander, placement }) => {

    const [popup, setPopup] = useState(false);

    const handlePopup = () => {
        setPopup(true);
    }

    const handleClose = () => {
        setPopup(false);
    }

    useEffect(() => {
        if (popup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [popup]);

    return (
        <>
            <div className='xl:pt-0 lg:pt-0 md:pt-0 pt-10'>
                <GridBox columns={2} gap={7} className='items-center'>
                    <GridBox.GridItem columnMerge={1}>
                        <h1 className='text-dark_text xl:leading-[80px] lg:leading-[80px] md:leading-[50px] leading-[40px] xl:text-[60px] lg:text-[60px] md:text-[40px] text-[35px] font-semibold mb-[0.7rem] text-balance'><span className='text-secondary'>{banner.heading}</span> {banner.title}</h1>
                        <p className='text-paragraph xl:text-lg lg:text-lg md:text-lg text-[20px] text-balance font-medium'>{banner.label}</p>
                        <div className='xl:flex lg:flex md:block block xl:gap-3 lg:gap-3 md:gap-3 gap-0 space-y-5 xl:space-y-0 lg:space-y-0 md:space-y-5 mt-8'>
                            <Link href={banner.join_url} className='bg-secondary text-white px-[30px] py-2.5 rounded-[30px]'>{banner.join_button}</Link>
                            <button className='flex gap-2 items-center text-[18px] text-dark_text' onClick={handlePopup}><SVGIcon className="text-xl w-[40px] h-[40px] bg-white flex justify-center items-center rounded-[50%] text-tertiary" name="play" /> {banner.watch}</button>
                        </div>
                    </GridBox.GridItem>
                    <GridBox.GridItem columnMerge={1} className='relative'>
                        <Image src={banner.image} alt={banner.heading} width={433} height={577} className='m-auto' />
                        <div className='top-image'>
                            <div className='bg-[hsla(0,0%,100%,0.89)] h-[60px] justify-around absolute xl:w-[35%] lg:w-[40%] md:w-[55%] w-[60%] z-[1] items-center flex rounded-[10px] left-[10%] xl:top-[20%] lg:top-[10%] md:top-[10%] top-[10%]'>
                                <SVGIcon className="text-xl w-[30px] h-[30px] flex justify-center items-center bg-tertiary rounded-[5px] text-white" name={calander.icon} />
                                <p><span className='text-black'>{calander.title}</span><br /><span className='text-black'>{calander.label}</span></p>
                            </div>
                            <div className='bg-[hsla(0,0%,100%,0.89)] h-[60px] justify-around absolute xl:w-[35%] lg:w-[40%] md:w-[55%] w-[60%] z-[1] items-center flex rounded-[10px] right-0 top-[60%]'>
                                <SVGIcon className="text-xl w-[30px] h-[30px] flex justify-center items-center bg-tertiary rounded-[5px] text-white" name={placement.icon} />
                                <p><span className='text-black'>{placement.title}</span><br /><span className='text-black'>{placement.label}</span></p>
                            </div>
                        </div>
                    </GridBox.GridItem>
                </GridBox>
            </div>
            {popup ? (
                <div className={`tutorial ${popup ? "fixed inset-0 overflow-y-auto z-[999] bg-[#00000096]" : ""}`}>
                    <div className='flex items-center justify-center min-h-screen'>
                        <div className='relative bg-white p-[10px] xl:w-[50%] lg:w-[80%] md:w-[80%] w-[90%]'>
                            <iframe src={banner.youtube_link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  className='w-full xl:h-[400px] lg:h-[400px] md:h-[400px] h-[200px]'></iframe>
                            <button type='button' onClick={handleClose}><SVGIcon className="text-xl bg-[white] w-[30px] h-[30px] flex justify-center items-center absolute rounded-[50%] xl:right-[-35px] lg:right-[-35px] md:right-[-35px] right-[-10px] xl:top-[-30px] lg:top-[-30px] md:top-[-30px] top-[-15px]" name="RxCross2" /></button>
                        </div>
                    </div>
                </div>
            ) : (null)}
        </>
    )
}
