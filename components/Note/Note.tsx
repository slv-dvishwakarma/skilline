import React, { useState } from "react";
import { SVGIcon } from "../Icons";
import classNames from "classnames";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
interface NoteItem {
  icon: string;
  title: string;
  label: string;
}

interface NoteProps {
  data?: NoteItem;
  admin?: boolean;
}

export const Note: React.FC<any> = ({ data, admin, removeItem, onSave }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data?.code);
  return (
    <>
      {data ? (
        <div className="note bg-[#25353A] rounded-xl px-[20px] py-8 space-y-5 relative">
          <div className="text-2xl font-display font-bold text-[#44AC99] flex items-center gap-2.5">
            <SVGIcon name={data?.icon} />
            <span>{data?.heading}</span>
          </div>
          {edit ? (
            <textarea
              // type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-white bg-transparent w-full outline-none h-full"
            />
          ) : (
            <p className="whitespace-pre-wrap my-4 text-white">{value}</p>
          )}
          {admin && (
            <div className="absolute top-[-33px] right-0 flex items-center gap-2 z-40">
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
                  edit ? onSave({ ...data }) : removeItem(data);
                  setEdit(false);
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
      ) : null}
    </>
  );
};
