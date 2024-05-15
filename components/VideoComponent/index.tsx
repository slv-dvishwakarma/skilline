import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import EditPopup from "../PopUpComponent";
import classNames from "classnames";
import { RxCross2 } from "react-icons/rx";

const VideoComponent = ({ data, admin, onSave, removeItem }: any) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data?.description);
  const [url, setUrl] = useState(data?.url);
  return (
    <>
      <div className="relative h-fit">
        <iframe
          src={data?.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full xl:h-[400px] lg:h-[400px] md:h-[400px] h-[200px]"
        ></iframe>

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
                edit
                  ? onSave({ ...data, description: value, url: url })
                  : removeItem(data);
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

        {edit && (
          <EditPopup
            initialValue={data?.url}
            onCancel={() => setEdit(false)}
            onChange={setUrl}
            // onChange={onChange}
          />
        )}
      </div>
      <p className="whitespace-pre-wrap my-4 font-display text-xl text-common leading-relaxed w-full">
        {edit ? (
          <textarea
            rows={5}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full outline-none"
          />
        ) : (
          data?.description
        )}
      </p>
    </>
  );
};

export default VideoComponent;
