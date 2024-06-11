import { BlockNoteEditor } from '@/components/BlocknoteEditor'
import { GridBox } from '@/components/GridBox'
import { SVGIcon } from '@/components/Icons'
import { ParentContainer } from '@/components/ParentContainer'
import { Tiptap } from '@/components/Tiptap'
import Link from 'next/link'
import React from 'react'

const Page = () => {

    const menu = [
        {
            title: "Introduction",
            url: "/Introduction"
        },
        {
            title: "How Dashboard Looks",
             url: "/dashboard",
        },
        {
            title: "Compute Services:",
             url: "/compute",
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
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
            ]
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
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
            ]
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
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
                {
                    title: "Team",
                    url: "/about/team"
                },
            ]
        }
    ];

    return (
        <>
        <div className='' id='editor-toolbar'>  </div>
        <ParentContainer className='bg-[#F9FBFD] '>
           
            <div className='flex gap-[25px] sidebar'>
                <div className='my-5 w-[22%] text-[#444746] font-roboto sticky h-fit p-2.5 top-0'>
                    <SVGIcon className="w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-[transparent] hover:bg-[#F9FBFD]" name="arrowleft" />
                    <ul className='space-y-2 overflow-y-auto h-[500px]'>
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
                                    <Link className='tracking-[0.25px] text-sm  before:content-["–"] before:text-[17px] before:mr-[5px] text-[#0b57d0] font-medium' href={item.url}>{item.title}</Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='w-[78%] border border-solid border-[#c7c7c7] p-5 bg-white mt-[15px]'>
                    <Tiptap />
                  
                    
                </div>
            </div>
        </ParentContainer>
        </>
    );
};

export default Page;
