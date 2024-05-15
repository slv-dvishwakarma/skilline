import React, { useState } from "react";
import { SVGIcon } from "../Icons";
import classNames from "classnames";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
interface TerminalProps {
  data?: {
    code?: any;
  };
  admin?: any;
  onSave?: any;
  removeItem?: any;
}

export const Terminal: React.FC<TerminalProps> = ({
  data,
  admin,
  onSave,
  removeItem,
}) => {
  const [copied, setCopied] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data?.code);
  const handleCopy = () => {
    if (data?.code) {
      navigator.clipboard
        .writeText(data?.code)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy code: ", err));
    }
  };

  return (
    <>
      {data ? (
        <div className="relative">
          <div className="terminal bg-[#4E5769] text-white flex justify-between text-[13px]  px-5 py-[10px]">
            <span className="flex gap-3 items-center">
              <SVGIcon name="terminal" />
              <p>Terminal</p>
            </span>
            <span
              className="flex gap-3 items-center cursor-pointer"
              onClick={handleCopy}
            >
              <SVGIcon name="copy" />
              <p>{copied ? "Copied" : "Copy"}</p>
            </span>
          </div>
          <div className="command bg-[#5E687E] px-5 py-[3px] text-white h-20 items-center flex">
            {edit ? (
              <input
                className="outline-none w-full bg-transparent tex-white"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <p>{data?.code}</p>
            )}
          </div>
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
                  edit ? onSave({ ...data, code: value }) : removeItem(data);
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
