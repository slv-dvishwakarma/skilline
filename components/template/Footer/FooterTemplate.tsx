import { NewsLetter } from '@/components/NewsLetter';
import Link from 'next/link'
import React from 'react'

interface EmailItem {
    name: string;
    placeholder: string;
    button: string;
    label: string;
}

interface LinksItem {
    label: string;
    url: string;
}

interface FooterTemplateItem {
    logo: string;
    label: string;
}

interface FooterProps {
    footer: FooterTemplateItem;
    subscribe: EmailItem;
    links: LinksItem[];
    copyright: string;
}

export const FooterTemplate: React.FC<FooterProps> = ({ footer, subscribe, links, copyright }) => {
    return (
        <div className='footer py-7 xl:px-0 lg:px-0 md:px-0 px-2'>
            <div className='items-center flex h-[80px] justify-center xl:w-[30%] lg:w-[60%] md:w-[60%] w-full mt-[3%] mb-auto mx-auto gap-5 divide-x-2'>
                <Link href="/" className="block text-3xl font-bold relative no-underline z-[1] text-white after:bg-bg-transparent after:border-2 after:border-solid after:border-[#26c1f2] after:rounded after:content-[''] after:block xl:after:h-[40px] lg:after:h-[30px] md:after:h-[30px] after:h-[40px] after:left-[-10%] after:absolute after:rotate-45 xl:after:w-[40px] lg:after:w-[30px] md:after:w-[30px] after:w-[40px] after:z-[-1] after:top-0 leading-[46px]">{footer.logo}</Link>
                <h3 className='text-white text-[17px] pl-3 font-semibold'>{footer.label}</h3>
            </div>
            <div className='xl:w-[40%]  lg:w-[60%] md:w-[60%] w-full pb-[2%] mx-auto'>
                <NewsLetter name={subscribe.name} placeholder={subscribe.placeholder} button={subscribe.button} label={subscribe.label} />
            </div>
            <div className='xl:w-[40%]  lg:w-[60%] md:w-[60%] w-full pb-[2%] mx-auto'>
                <ul className='xl:flex lg:flex md:flex flex justify-between xl:divide-x-2 lg:divide-x-2 md:divide-x-2 divide-x-0'>
                    {links.map((menu, index) => (
                        <li key={index} className='flex justify-center text-center'><Link href={menu.url} className='text-white xl:pl-6 lg:pl-6 md:pl-6 pl-2'>{menu.label}</Link></li>
                    ))}
                </ul>
            </div>
            <span className='flex justify-center text-xl text-white mt-3'>{copyright}</span>
        </div>
    )
}
