"use client"
import { BlockNoteEditor } from '@/components/BlocknoteEditor'
import { GridBox } from '@/components/GridBox'
import { SVGIcon } from '@/components/Icons'
import { ParentContainer } from '@/components/ParentContainer'
import { Tiptap } from '@/components/Tiptap'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {

    const menu = [
        {
            title: "Introduction",
            url: "/Introduction"
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

    const [show, setShow] = useState(true);

    const handleSidebar = () => {
        setShow(!show);
    }

    return (
        <>
            <div className='' id='editor-toolbar'>  </div>
            <ParentContainer className='bg-[#F9FBFD] '>
                <div className='xl:flex lg:flex md:flex block gap-[25px] sidebar'>
                    <div className='xl:w-[22%] lg:w-[22%] md:w-[22%] w-full text-[#444746] font-roboto xl:sticky lg:sticky md:sticky h-fit p-2.5 top-0 my-[10px]'>
                        <div onClick={handleSidebar}>
                        <SVGIcon className='flex items-center justify-center  text-xl bg-transparent w-[35px] hover:bg-[#E9ECEF] h-[35px] rounded-[50%]' name={show ? "arrowleft" : "burgerMenu"} />
                        </div>
                        {show && (
                            <div className='mt-3 overflow-y-auto h-[500px]'>
                            <p className='text-[#5f6368] text-[11px] font-medium tracking-[0.1px] leading-4 normal-case pl-2.5'>outline</p>
                            <ul className='space-y-2 mt-3 '>
                                {menu.map((item, index) => (
                                    <li key={index}>
                                        {item.submenu ? (
                                            <div className='pl-8 space-y-2'>
                                                <Link className='tracking-[0.25px] text-sm' href={item.url}>{item.title}</Link>
                                                <ul className='pl-5 space-y-2'>
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <li className='tracking-[0.25px] text-[15px] ' key={subIndex}><Link href={subItem.url}>{subItem.title}</Link></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link className='tracking-[0.25px] text-[15px]  before:content-["–"] before:text-[17px] before:mr-[5px] text-[#0b57d0] font-medium' href={item.url}>{item.title}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}
                        
                    </div>
                    <div className='xl:w-[78%] lg:w-[78%] md:w-[78%] w-full border border-solid border-[#c7c7c7] p-5 bg-white my-[15px] ul-li'>
                        <Tiptap />
                    </div>
                </div>
            </ParentContainer>
        </>
    );
};

export default Page;
