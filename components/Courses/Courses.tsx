import React from 'react'
import { GridBox } from '../GridBox';
import Image from 'next/image';
import Link from 'next/link';

interface CardItem {
    page_url: string;
    image: string;
    name: string;
    description: string;
}

interface CoursesItem {
    title: string;
    card: CardItem[];
}

interface CoursesProps {
    course: CoursesItem;
}

export const Courses: React.FC<CoursesProps> = ({ course }) => {
    return (
        <div className='Courses py-[50px]'>
            <h2 className='text-secondary text-[40px] font-semibold text-center'>{course.title}</h2>
            <GridBox columns={4} gap={7} className='pt-[30px] xl:space-y-0 lg:space-y-0 md:space-y-0 space-y-10'>
                {course.card.map((item, index) => (
                    <GridBox.GridItem columnMerge={1} key={index} className='shadow-[rgba(149,157,165,0.2)_0px_8px_24px] group rounded-xl'>
                        <Link href={item.page_url} >
                            <Image alt={item.name} src={item.image} width={556} height={452} className='rounded-t-xl' />
                            <div className='text-center p-5 space-y-4'>
                                <h3 className='text-[21px] font-medium group-hover:text-secondary text-common'>{item.name}</h3>
                                <p className='text-[15px] text-common group-hover:text-dark_text'>{item.description}</p>
                            </div>
                        </Link>
                    </GridBox.GridItem>
                ))}

            </GridBox>
        </div>
    )
}
