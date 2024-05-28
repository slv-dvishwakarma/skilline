"use client";

import { GridBox } from "@/components/GridBox";
import { SVGIcon } from "@/components/Icons";
import { ParentContainer } from "@/components/ParentContainer";
import en from "./en.json";
import { SideBar } from "./reactjs/SideBar";
import { useEffect, useState, useCallback } from "react";
import { serverActions } from "@/serverActions";
import { startMirageServer } from "@/miragejs/server";

const CourceLayout = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<any>(null);
  startMirageServer();

  const handleCourse = () => {
    setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };

  const configHome: any = [
    {
      id: "sub_bar",
      url: "side-bar",
      method: "GET",
    },
  ];

  const entityData = useCallback(async () => {
    setData(await serverActions(configHome));
  }, [configHome]);

  const saveSidebarChanges = useCallback(async (updatedData: any) => {
    console.log(updatedData);
    const config: any = [
      {
        id: "sub_bar",
        url: "side-bar",
        method: "POST",
        data: updatedData,
      },
    ];

    await serverActions(config);
    entityData();
  }, [entityData]);

  useEffect(() => {
    entityData();
  }, [entityData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const removeItem = async (index: number) => {
    const updatedData = data?.sub_bar?.success.sub_category;
    updatedData.splice(index, 1);
    await saveSidebarChanges({ ...data?.sub_bar.success });
  };

  const addItem = async (item: number) => {
    const updatedData = data?.sub_bar?.success.sub_category;
    updatedData.push(item);

    await saveSidebarChanges({ ...data?.sub_bar.success });
  };

  const replaceItem = async (item: any, index: number) => {
    const updatedData = data?.sub_bar?.success.sub_category;
    updatedData.splice(index, 1, item);

    await saveSidebarChanges({ ...data?.sub_bar.success });
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
            {data?.sub_bar?.success && (
              <SideBar
                data={data?.sub_bar?.success}
                removeItem={removeItem}
                addItem={addItem}
                replaceItem={(data, index) => replaceItem(data, index)}
              />
            )}
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
            {/* {data?.sub_bar?.success && (
              <SideBar
                data={data?.sub_bar?.success}
                close={handleClose}
                // removeItem
              />
            )} */}
          </div>
        </div>
      )}
    </ParentContainer>
  );
};

export default CourceLayout;
