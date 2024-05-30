import Link from 'next/link';
import React from 'react'

interface LearnItem {
    title: string;
    url: string;
}

interface TOCProps {
    label?: string;
    toc?: LearnItem[];
}


export const TOC: React.FC<TOCProps> = ({ label, toc }) => {
    return (
        <div className='p-6 rounded-xl border border-solid border-[gray]'>
            <h3 className='mdx-heading text-common  mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6'>{label}</h3>
            <ul className='space-y-2 pl-[22px]'>
                {toc?.map((menu, index) => (
                    <li className='text-common list-disc hover:text-secondary' key={index}><Link href={menu.url}>{menu.title}</Link></li>
                ))}
            </ul>
        </div>
    )
}
