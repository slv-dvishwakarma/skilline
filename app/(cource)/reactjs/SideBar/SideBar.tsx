"use client";
import { SVGIcon } from "@/components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
  removeItem: (index: number) => void; // Function to remove item
}

export const SideBar: React.FC<SideBarProps> = ({
  data,
  close,
  removeItem,
}) => {
  const pathName = usePathname();
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="SideBar shadow p-3 rounded-lg">
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
                <div className="flex items-center justify-between">
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
                  <button type="button" onClick={() => removeItem(index)}>
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
