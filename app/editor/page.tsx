import { GridBox } from '@/components/GridBox'
import { SVGIcon } from '@/components/Icons'
import { ParentContainer } from '@/components/ParentContainer'
import { Tiptap } from '@/components/Tiptap'
import Link from 'next/link'
import React from 'react'

const Page = () => {

    const menu = [
        {
            title: "Get Started",
            url: "/started"
        },
        {
            title: "About",
             url: "/about",
            submenu: [
                {
                    title: "Company",
                    url: "/about/company"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
            ]
        },
    ];

    return (
        <ParentContainer className='bg-[#F9FBFD]'>
            <GridBox columns={4}>
                <GridBox.GridItem columnMerge={1} className='my-5'>
                    <SVGIcon className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[transparent] hover:bg-[#F9FBFD]" name="arrowleft" />
                    <ul className='space-y-2'>
                        {menu.map((item, index) => (
                            <li key={index}>
                                {item.submenu ? (
                                    <div className='pl-8 space-y-2'>
                                        <Link className='tracking-[0.25px] text-sm' href={item.url}>{item.title}</Link>
                                        <ul className='pl-5 space-y-2'>
                                            {item.submenu.map((subItem, subIndex) => (
                                                <li className='tracking-[0.25px] text-sm ' key={subIndex}><Link href={subItem.url}>{subItem.title}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <Link className='tracking-[0.25px] text-sm  before:content-["–"] before:text-[17px] before:mr-[5px]' href={item.url}>{item.title}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </GridBox.GridItem>
                <GridBox.GridItem columnMerge={3}>
                    <Tiptap />
                </GridBox.GridItem>
            </GridBox>
        </ParentContainer>
    );
};

export default Page;
