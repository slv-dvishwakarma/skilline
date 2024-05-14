import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const BulletLinkBox = ({ data, admin }: any) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data?.description);
  return (
    <div className="p-6 rounded-xl border border-solid border-[gray] relative">
      <h3 className="mdx-heading text-common  mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6">
        {data?.heading}
      </h3>
      <ul className="space-y-2 pl-[22px]">
        {data?.points?.map((menu: any, index: number) => (
          <li
            className="text-common list-disc hover:text-secondary"
            key={index}
          >
            <Link href={menu.url}>{menu.title}</Link>
          </li>
        ))}
      </ul>
      {admin && (
        <div className="absolute top-[-12px] right-0 flex items-center gap-2 z-40">
          <button
            type="button"
            onClick={() => {
              setEdit(!edit);
              //   setShowAddPopup(true);
              //   setNewItem(category);
              //   setReplace(index);
            }}
            className={classNames(
              "bg-white  p-1 shadow-2xl border",
              edit ? "rounded-md" : "rounded-full"
            )}
          >
            {edit ? <RxCross2 /> : <RiEditLine />}
          </button>
          <button
            type="button"
            onClick={() => {
              //   removeItem(index);
            }}
            className={classNames(
              edit
                ? "rounded-md bg-orange-500 text-white"
                : "rounded-full bg-white",
              "  p-1 shadow-2xl border "
            )}
          >
            {edit ? "Save" : <MdOutlineDeleteOutline />}
          </button>
        </div>
      )}
    </div>
  );
};

export default BulletLinkBox;
