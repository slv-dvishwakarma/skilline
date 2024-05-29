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

  const [toggles, setToggles] = useState<boolean[]>(Array(sidebar.length).fill(true));

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

  const handleToggle = (index: number) => {
    setToggles(toggles.map((toggle, i) => (i === index ? !toggle : toggle)));
  };

  return (
    <div className='SideBar space-y-3'>
      {sidebar.map((item, index) => (
        <div key={index}>
          <div className='flex items-center justify-between text-blog_title cursor-pointer text-common' onClick={() => handleToggle(index)}>
            <h3 className="text-lg font-medium">{item.category}</h3>
            <button type='button' ><SVGIcon className="text-lg" name={toggles[index] ? "ArrowUp" : "ArrowDown"} /></button>
          </div>
          {toggles[index] && (
            <ul className='text-blog_title py-3 space-y-4'>
              {item.sub_category.map((category, subIndex) => (
                <li key={subIndex} onClick={() => close?.()}>
                  <Link href={category.url} className={`text-[16px] ${pathName === category.url ? "text-secondary" : "text-blog_title"}`}>{category.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
