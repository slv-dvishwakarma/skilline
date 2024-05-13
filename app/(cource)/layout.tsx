"use client";
import { GridBox } from "@/components/GridBox";
import { SVGIcon } from "@/components/Icons";
import { ParentContainer } from "@/components/ParentContainer";
import en from "./en.json";
import { SideBar } from "./reactjs/SideBar";
import { useState } from "react";

const CourceLayout = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);

  const handleCourse = () => {
    setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };

  return (
    <ParentContainer className="bg-section py-[50px]">
      <div className="flex items-center justify-between">
        <div className="flex relative items-center gap-2.5 after:content-[''] after:w-full after:h-[3px] after:absolute after:bg-tertiary after:left-0 after:bottom-[-5px] xl:w-[200px] lg:w-[200px] md:w-[200px] w-[130px]">
          <SVGIcon className="text-xl text-secondary" name={en.icon} />
          <h1 className="text-blog_title text-xl">{en.title}</h1>
        </div>
        <div
          className="xl:hidden lg:hidden md:flex flex gap-3 items-center cursor-pointer"
          onClick={handleCourse}
        >
          <SVGIcon className="text-xl text-secondary" name="HamburgerMenu" />
          <p className="text-blog_title">Index</p>
        </div>
      </div>
      <GridBox columns={3} gap={10} className="py-[20px]">
        <GridBox.GridItem
          columnMerge={1}
          className="xl:block lg:block md:hidden hidden"
        >
          <div className="shadow-[rgba(149,157,165,0.2)_0px_8px_24px] border p-5 rounded-xl border-solid border-white">
            <SideBar data={en.sidebar} />
          </div>
        </GridBox.GridItem>
        <GridBox.GridItem columnMerge={2}>
          {children}
          {/* <Index  /> */}
        </GridBox.GridItem>
      </GridBox>
      {toggle && (
        <div className="fixed inset-0 overflow-y-auto z-[999] bg-white">
          <div className="px-[4%]">
            <div className="flex items-center justify-between px-0 py-5">
              <span>course</span>
              <span onClick={handleClose}>
                <SVGIcon
                  className="shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg text-xl"
                  name="RxCross2"
                />
              </span>
            </div>
            <SideBar data={en.sidebar} close={handleClose} />
          </div>
        </div>
      )}
    </ParentContainer>
  );
};

export default CourceLayout;
