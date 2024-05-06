import React from 'react'
import { GridBox } from '../GridBox';
import Image from 'next/image';
import { SVGIcon } from '../Icons';


interface ImageItem {
    order: number;
    image: string;
}

interface ContentItem {
    order: number;
    slug: string;
    title: string;
    heading?: string;
    label: string;
    button: string;
}

interface ImageTextLayoutItem {
    image_position: ImageItem;
    content_position: ContentItem;
}

interface ImageTextLayoutProps {
    ImageTextLayout: ImageTextLayoutItem;
}

export const ImageTextLayout: React.FC<ImageTextLayoutProps> = ({ ImageTextLayout }) => {
    return (
        <GridBox columns={2} gap={10} className='py-[50px] items-center xl:space-y-0 lg:space-y-0 md:space-y-0 space-y-10'>
            <GridBox.GridItem columnMerge={1} className={`order-${ImageTextLayout.image_position.order}`}>
                <Image src={ImageTextLayout.image_position.image} alt={ImageTextLayout.content_position.heading || ""} width={700} height={700} className='xl:w-[55%] lg:w-[55%] md:w-[55%] w-[90%] m-auto' />
            </GridBox.GridItem>
            <GridBox.GridItem columnMerge={1} className={`space-y-5 order-${ImageTextLayout.content_position.order}`}>
                <h6 className='text-dark_text font-semibold before:content-[""] before:w-[50px] before:h-[3px] before:absolute before:bg-dark_text before:top-2.5 relative pl-[60px] before:left-0'>{ImageTextLayout.content_position.slug}</h6>
                <h3 className="xl:text-[35px] lg:text-[30px] md:text-[30px] text-[30px] text-dark_text font-semibold"><span>{ImageTextLayout.content_position.title}</span> <span className="text-secondary">{ImageTextLayout.content_position.heading}</span></h3>
                <p className='text-blog_title text-[15px] font-medium text-justify'>{ImageTextLayout.content_position.label}</p>
                <button className='border px-[30px] py-2.5 rounded-[25px] border-solid border-secondary text-secondary flex items-center gap-4'>{ImageTextLayout.content_position.button} <SVGIcon className="text-[25px]" name="arrowright" /></button>
            </GridBox.GridItem>
        </GridBox>
    )
}
