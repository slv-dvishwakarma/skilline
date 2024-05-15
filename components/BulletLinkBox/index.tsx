import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import SmallPopUp from "../AlertPopup/smallPopUp";
import DeleteConfirmation from "../AlertPopup";

const BulletLinkBox = ({ data, admin, onSave, removeItem }: any) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data?.description);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newItem, setNewItem] = useState<any>({ title: "", url: "" });
  const [replace, setReplace] = useState<any>(null);
  const removeListItem = (index: any) => {
    const newList = data;
    delete newList?.points[index];
    console.log(newList);
    onSave(newList);
    setDeleteConfirm(null);
  };
  const addListItem = (listItem: any) => {
    const newList = data;
    newList?.points?.push(listItem);
    onSave(newList);
  };
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  return (
    <div className="p-6 rounded-xl border border-solid border-[gray] relative">
      <h3 className="mdx-heading text-common  mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6">
        {data?.heading}
      </h3>
      <ul className="space-y-2 pl-[22px]">
        {data?.points?.map((menu: any, index: number) =>
          menu ? (
            <div className="flex justify-between">
              <li
                className="text-common list-disc hover:text-secondary"
                key={index}
              >
                <Link href={menu.url}>{menu.title}</Link>
              </li>
              {admin && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddPopup(true);
                      setNewItem(menu);
                      setReplace(index);
                    }}
                  >
                    <RiEditLine />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      console.log(index);
                      setDeleteConfirm(index);
                    }}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )
        )}
        <button onClick={() => setShowAddPopup(true)}>Add Item</button>
        {showAddPopup && (
          <SmallPopUp
            showAddPopup={showAddPopup}
            setShowAddPopup={setShowAddPopup}
            addItem={addListItem}
            newItem={newItem}
            setNewItem={setNewItem}
          />
        )}
        {deleteConfirm !== null && (
          <DeleteConfirmation
            message="selete cheyala"
            onConfirm={() => removeListItem(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </ul>
      {admin && (
        <div className="absolute top-[-12px] right-0 flex items-center gap-2 z-40">
          <button
            type="button"
            onClick={() => {
              removeItem(data);
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
  );
};

export default BulletLinkBox;
