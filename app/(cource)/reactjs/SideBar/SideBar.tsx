"use client";
import { SVGIcon } from "@/components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategoryItem {
  title: string;
  url: string;
}

interface SidebarItem {
  category: string;
  sub_category: CategoryItem[];
}

interface SideBarProps {
  data: SidebarItem;
  close?: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ data, close }) => {
  const pathName = usePathname();

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    // const isSidebarActive = sidebar.some((item) => {
    //   return data?.sub_category.some((subItem) => {
    //     return subdata?.url && subdata?.url === pathName;
    //   });
    // });
    // if (isSidebarActive && close) {
    //   close();
    // }
  }, [pathName, data, close]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="SideBar shadow p-3 rounded-lg">
      {/* {sidebar.map((item, index) => ( */}
      <div>
        <div
          className="flex items-center justify-between text-blog_title cursor-pointer text-common"
          onClick={handleToggle}
        >
          <h3 className="text-lg font-medium">{data?.category}</h3>
          <button type="button">
            <SVGIcon
              className="text-lg"
              name={toggle ? "ArrowUp" : "ArrowDown"}
            />
          </button>
        </div>
        {toggle && (
          <ul className="text-blog_title py-3 space-y-6">
            {data?.sub_category?.map((category, index) => (
              <li key={index} onClick={() => close?.()}>
                <Link
                  href={category.url}
                  className={`text-[16px] ${
                    pathName === category.url
                      ? "text-secondary"
                      : "text-blog_title"
                  }`}
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* ))} */}
    </div>
  );
};
