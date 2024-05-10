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
  category: string;
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
  
    if (isSidebarActive && close) {
      close();
    }
  }, [pathName, sidebar, close]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className='SideBar'>
      {sidebar.map((item, index) => (
        <div key={index}>
          <div className='flex items-center justify-between text-blog_title cursor-pointer text-common' onClick={handleToggle}>
            <h3 className="text-lg font-medium">{item.category}</h3>
            <button type='button' ><SVGIcon className="text-lg" name={toggle ? "ArrowUp" : "ArrowDown"} /></button>
          </div>
          {toggle && (
            <ul className='text-blog_title py-3 space-y-6'>
              {item.sub_category.map((category, index) => (
                <li key={index}><Link href={category.url} className={`text-[16px] ${pathName === category.url ? "text-secondary" : "text-blog_title"}`}>{category.title}</Link></li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

