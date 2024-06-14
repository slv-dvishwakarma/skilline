"use client"
import { BlockNoteEditor } from '@/components/BlocknoteEditor'
import { GridBox } from '@/components/GridBox'
import { SVGIcon } from '@/components/Icons'
import { ParentContainer } from '@/components/ParentContainer'
import { Tiptap } from '@/components/Tiptap'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Heading = {
    type: string;
    attrs: {
        textAlign: string;
        level: number;
    };
    content: {
        type: string;
        text: string;
    }[];
};

type ApiResponse = {
    type: string;
    content: Heading[];
};

const Page = () => {

    const [show, setShow] = useState(true);
    const [jsonData, setJsonData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/save-data');
                const data: ApiResponse = await res.json();
                setJsonData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const generateIds = (headings: Heading[]) => {
        return headings.map((heading, index) => ({
            ...heading,
            id: `heading-${index}`,
        }));
    };

    const handleSidebar = () => {
        setShow(!show);
    }


    const buildNestedStructure = (headings: Heading[]) => {
        const nestedHeadings: any[] = [];

        const stack: any[] = [];

        headings.forEach((heading) => {
            const { level } = heading.attrs;
            const newNode = { ...heading, children: [] };

            while (stack.length > 0 && stack[stack.length - 1].attrs.level >= level) {
                stack.pop();
            }

            if (stack.length === 0) {
                nestedHeadings.push(newNode);
            } else {
                stack[stack.length - 1].children.push(newNode);
            }

            stack.push(newNode);
        });

        return nestedHeadings;
    };

    const renderTOC = (headings: any[]) => {
        return (
            <ul className='space-y-2 mt-2'>
                {headings.map((heading, index) => (
                    <li key={index} className='text-[#3c4043] font-medium tracking-[0.25px] text-sm pl-2' style={{ marginLeft: `${(heading.attrs.level - 1) * 3}px` }}>
                        <Link href={`#${heading.id}`}>
                        {heading.content && heading.content.length > 0 ? heading.content[0].text : ''}
                        </Link>
                        {heading.children.length > 0 && renderTOC(heading.children)}
                    </li>
                ))}
            </ul>
        );
    };

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
                                <p className='text-[#5f6368] text-[11px] font-medium tracking-[0.1px] leading-4 normal-case pl-2.5'>Outline</p>
                                {jsonData && renderTOC(buildNestedStructure(generateIds(jsonData.content.filter(heading => heading.type === 'heading'))))}
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
