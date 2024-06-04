"use client"
import { GridBox } from "@/components/GridBox"
import { SVGIcon } from "@/components/Icons"
import { ParentContainer } from "@/components/ParentContainer"
import sidebar from "./sidebar.json"
import { SideBar } from "./reactjs/SideBar"
import { useState } from "react"


const CourceLayout = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);

  const handleCourse = () => {
    setToggle(true);
  }
  const handleClose = () => {
    setToggle(false);
  }

  return <div className="w-full px-[4%] md:px-[3%] lg:px-[3%] xl:px-[5%] bg-section">

    <GridBox columns={3} gap={10} className='py-[20px]'>
      <GridBox.GridItem columnMerge={1} className="sticky bg-[#f8f8f8] border rounded h-fit p-2.5 border-solid border-[#ccc] top-0">
        <div className="flex items-center justify-between">
          <div className="flex relative items-center gap-2.5 after:content-[''] after:w-full after:h-[3px] after:absolute after:bg-tertiary after:left-0 after:bottom-[-5px] xl:w-[200px] lg:w-[200px] md:w-[200px] w-[130px]">
            <SVGIcon className="text-xl text-secondary" name={sidebar.sidebar_title.content.icon} />
            <h1 className='text-blog_title text-xl'>{sidebar.sidebar_title.content.title}</h1>
          </div>
          <div className="xl:hidden lg:hidden md:flex flex gap-3 items-center cursor-pointer" onClick={handleCourse}>
            <SVGIcon className="text-xl text-secondary" name="HamburgerMenu" />
            <p className="text-blog_title">Index</p>
          </div>
        </div>
        <div className=" p-5 rounded-xl  xl:block lg:block md:hidden hidden mt-5 ">
          <SideBar sidebar={sidebar.sidebar.content} />
        </div>
      </GridBox.GridItem>
      <GridBox.GridItem columnMerge={2} className="pt-3">
        {children}
        {/* <Index  /> */}
      </GridBox.GridItem>
    </GridBox>
    {toggle && (
      <div className='fixed inset-0 overflow-y-auto z-[999] bg-white'>
        <div className="px-[4%]">
          <div className='flex items-center justify-between px-0 py-5'>
            <span>course</span>
            <span onClick={handleClose}><SVGIcon className='shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] bg-white inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-secondary rounded-lg text-xl' name="RxCross2" /></span>
          </div>
          <SideBar sidebar={sidebar.sidebar.content} close={handleClose} />
        </div>
      </div>
    )}
  </div>
}

export default CourceLayout