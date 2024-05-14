"use client";
import { SVGIcon } from "@/components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { RiEditLine } from "react-icons/ri";

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
  removeItem: (index: any) => void;
  addItem: (data: any) => void;
  replaceItem: (data: any, index: number) => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  data,
  close,
  removeItem,
  addItem,
  replaceItem,
}) => {
  const { isAdmin } = useSelector((state: any) => state.auth);
  const [toggle, setToggle] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newItem, setNewItem] = useState<CategoryItem>({ title: "", url: "" });

  const pathName = usePathname();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleAddItemClick = () => {
    setReplace(null);

    setShowAddPopup(true);
  };
  const [replace, setReplace] = useState<any>(null);
  const handleSaveItem = (index: number = 0) => {
    replace >= 0 ? replaceItem(newItem, replace) : addItem(newItem);
    setShowAddPopup(false);
    setNewItem({ title: "", url: "" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSaveItem();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const isSaveDisabled = newItem.title === "" || newItem.url === "";
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showAddPopup]);
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
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddPopup(true);
                          setNewItem(category);
                          setReplace(index);
                        }}
                      >
                        <RiEditLine />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          removeItem(index);
                        }}
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {isAdmin && (
              <li>
                <button type="button" onClick={handleAddItemClick}>
                  Add Item
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
      {showAddPopup && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowAddPopup(false)}
        >
          <div
            className="bg-white p-4 rounded-lg flex flex-col gap-3"
            onClick={(e: any) => e.stopPropagation()}
          >
            <input
              type="text"
              ref={inputRef}
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              onKeyDown={handleKeyDown}
              placeholder="Title"
              className="w-full outline-none"
            />
            <input
              type="text"
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
              onKeyDown={handleKeyDown}
              placeholder="URL"
              className="w-full outline-none"
            />
            <div>
              <button
                onClick={() => handleSaveItem()}
                className={`px-3 rounded-md bg-orange-400 text-white ${
                  isSaveDisabled && "opacity-50 cursor-not-allowed"
                }`}
                disabled={isSaveDisabled}
              >
                Save
              </button>
              <button onClick={() => setShowAddPopup(false)} className="px-3">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
