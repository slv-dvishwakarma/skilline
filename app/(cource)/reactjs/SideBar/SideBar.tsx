"use client"
import { SVGIcon } from '@/components/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CategoryItem {
  title: string;
  url: string;
}

interface SidebarItem {
  parent_category: CategoryItem;
  sub_category: CategoryItem[];
}

interface SideBarProps {
  sidebar: SidebarItem[];
  close?: () => void
}

export const SideBar: React.FC<SideBarProps> = ({ sidebar, close }) => {

  const pathName = usePathname();

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const isSidebarActive = sidebar.some(item => {
      return item.sub_category.some(subItem => {
        return subItem.url && subItem.url === pathName;
      });
    });
  
    // if (isSidebarActive && close) {
    //   close();
    // }
  }, [pathName, sidebar, close]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='SideBar'>
      {sidebar.map((item, index) => (
        <div key={index}>
          <div className='flex items-center justify-between text-blog_title cursor-pointer text-common' onClick={handleToggle}>
            {item.parent_category.url === "" ? (
            <h3 className="text-sm font-medium">{item.parent_category.title}</h3>
          ): (
            <Link href={item.parent_category.url} className="text-lg font-medium">{item.parent_category.title}</Link>
          )}
            <button type='button' ><SVGIcon className="text-lg" name={toggle ? "ArrowUp" : "ArrowDown"} /></button>
          </div>
          {toggle && (
            <ul className='text-blog_title py-3 space-y-6'>
              {item.sub_category.map((category, index) => (
                <li key={index} onClick={() => close?.()}
                ><Link href={category.url} className={`text-[16px] ${pathName === category.url ? "text-secondary" : "text-blog_title"}`}>{category.title}</Link></li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

