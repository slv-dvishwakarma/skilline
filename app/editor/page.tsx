"use client"
"use client"
import { SVGIcon } from '@/components/Icons'
import { ParentContainer } from '@/components/ParentContainer'
import { Tiptap } from '@/components/Tiptap'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface Node {
    type: string;
    attrs?: {
        id?: string;
        level?: number;
    };
    content?: Node[];
    text?: string;
}

const extractHeadings = (content: Node[]): Heading[] => {
    const headings: Heading[] = [];

    content.forEach(node => {
        if (node.type === 'heading' && node.attrs && node.attrs.id && node.attrs.level) {
            const textNode = node.content?.find(n => n.type === 'text');
            if (textNode) {
                headings.push({
                    id: node.attrs.id,
                    text: textNode.text || '',
                    level: node.attrs.level
                });
            }
        }
    });

    return headings;
}

const Page: React.FC = () => {
    const [show, setShow] = useState(true);
    const [data, setData] = useState<any>(null);
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [loading, setLoading] = useState(true);

    const handleSidebar = () => {
        setShow(!show);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/save-data');
                setData(response.data);
                const extractedHeadings = extractHeadings(response.data.content);
                setHeadings(extractedHeadings);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const renderTOC = (headings: Heading[]) => {
        return headings.map((heading, index) => {
            const marginLeft = (heading.level - 1) * 20;
            return (
                <div key={index} style={{ marginLeft: `${marginLeft}px` }} className="py-1 tracking-[0.25px] text-sm text-[#5f6368] font-medium">
                    <a href={`#${heading.id}`} className="hover:underline">
                        {heading.text}
                    </a>
                </div>
            );
        });
    }

    return (
        <>
            <div className='' id='editor-toolbar'>  </div>
            <ParentContainer className='bg-[#F9FBFD]'>
                <div className='xl:flex lg:flex md:flex block gap-[25px] sidebar'>
                    <div className='xl:w-[22%] lg:w-[22%] md:w-[22%] w-full text-[#444746] font-roboto xl:sticky lg:sticky md:sticky h-fit p-2.5 top-0 my-[10px]'>
                        <div onClick={handleSidebar}>
                            <SVGIcon className='h-12 w-[48px] -ml-3.5 flex items-center justify-center  text-xl bg-transparent w-[35px] hover:bg-[#E9ECEF] h-[35px] rounded-[50%]' name={show ? "arrowleft" : "burgerMenu"} />
                        </div>
                        {show ? (
                        <div className='h-[530px] overflow-y-auto'>
                            <h2 className="text-[#5f6368] text-[11px] font-medium tracking-[0.1px] leading-4 normal-case pb-3">Outline</h2>
                            {renderTOC(headings)}
                        </div>
                        ) : null}
                    </div>
                    <div className='xl:w-[78%] lg:w-[78%] md:w-[78%] w-full p-5 bg-white my-[15px] ul-li' style={{outline: "1px solid #c7c7c7"}}>
                        <Tiptap />
                    </div>
                </div>
            </ParentContainer>
        </>
    )
}

export default Page

