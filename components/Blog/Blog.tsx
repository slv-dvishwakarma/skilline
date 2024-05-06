import React from 'react'
import { GridBox } from '../GridBox';
import Image from 'next/image';

interface CardOptionalItem {
    title: string;
    label: string;
}

interface CardItem {
    image: string;
    label: string;
    title: string;
    description: string;
    button?: string;
}

interface CardProps {
    blogdata?: CardOptionalItem;
    news: CardItem;
    blogs: CardItem[];
}


export const Blog: React.FC<CardProps> = ({ blogdata, news, blogs }) => {
    return (
        <div className='Blog py-[50px]'>
            <div className='content text-center xl:w-[70%] lg:w-[80%] md:w-[90%] w-full m-auto space-y-6'>
                <h3 className='xl:text-[40px] lg:text-[40px] md:text-[40px] text-[35px] text-dark_text font-semibold'>{blogdata?.title}</h3>
                <p className='text-paragraph xl:text-lg lg:text-lg md:text-lg text-[20px] text-balance font-medium'>{blogdata?.label}</p>
            </div>
            <GridBox columns={2} desktop={2} laptop={2} tablet={1} gap={5} className='py-[50px]'>
                <GridBox.GridItem columnMerge={1} className='p-3 space-y-5'>
                    <div className='relative'>
                        <Image src={news.image} alt={news.title} width={500} height={500} className='w-full' />
                        <p className='bg-secondary  text-white text-[15px] rounded-[80px] px-[30px] py-2 absolute left-2.5 top-[15px]'>{news.label}</p>
                    </div>
                    <div className='space-y-5'>
                        <h3 className='text-blog_title xl:text-[22px] lg:text-lg md:text-lg text-[20px] font-medium leading-[33px]'>{news.title}</h3>
                        <p className='text-blog_title text-[15px] font-medium text-justify'>{news.description}</p>
                    </div>
                    <button className='text-secondary underline'>{news.button}</button>
                </GridBox.GridItem>
                <GridBox.GridItem columnMerge={1} className='p-3 xl:space-y-11 lg:space-y-7 md:space-y-6 space-y-11'>
                    {blogs.map((blog, index) => (
                        <GridBox key={index} columns={4} gap={5} className='xl:space-y-0 lg:space-y-0 md:space-y-0 space-y-7'>
                            <GridBox.GridItem columnMerge={1} className='relative'>
                                <Image src={blog.image} alt={blog.title} width={500} height={500} className='rounded-[20px] h-[150px] xl:h-[unset] lg:h-[unset] md:h-[unset] object-cover' />
                                <p className='bg-secondary  text-white rounded-[80px] xl:text-[10px] lg:text-[8px] md:text-[10px] text-[10px] px-2.5 py-[5px] absolute left-2 top-[8px]'>{blog.label}</p>
                            </GridBox.GridItem>
                            <GridBox.GridItem columnMerge={3}>
                                <div className='space-y-4'>
                                    <h3 className='text-blog_title xl:text-lg lg:text-lg md:text-lg text-[20px] text-justify font-medium leading-[33px]'>{blog.title}</h3>
                                    <p className='text-blog_title text-sm font-medium text-justify line-clamp-2'>{blog.description}</p>
                                </div>
                            </GridBox.GridItem>
                        </GridBox>
                    ))}
                </GridBox.GridItem>
            </GridBox>
        </div>
    )
}
