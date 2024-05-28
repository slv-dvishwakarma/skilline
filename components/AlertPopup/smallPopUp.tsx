import React, { useState, useRef } from "react";

const SmallPopUp = ({
  showAddPopup,
  setShowAddPopup,
  addItem,
  setNewItem,
  newItem,
}: any) => {
  //   const [newItem, setNewItem] = useState({ title: "", url: "" });
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const inputRef = useRef(null);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && newItem.title && newItem.url) {
      handleSaveItem();
    }
  };

  const handleSaveItem = () => {
    addItem(newItem);
    setShowAddPopup(false);
    setNewItem({ title: "", url: "" });
  };

  const handleCancel = () => {
    setShowAddPopup(false);
  };

  const handleInputChange = (e: any, field: any) => {
    const value = e.target.value;
    setNewItem((prevItem: any) => ({
      ...prevItem,
      [field]: value,
    }));
    setIsSaveDisabled(!(newItem.title && newItem.url));
  };

  return (
    showAddPopup && (
      <div
        className="fixed inset-0 overflow-y-auto z-[999] bg-[#00000096]"
        onClick={() => setShowAddPopup(false)}
      >
        <div
          className="flex items-center justify-center min-h-screen"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] mx-auto shadow-lg rounded-[20px] p-[20px] space-y-5">
          <p className="text-[22px] font-semibold text-secondary">Add Course List</p>
          <input
            type="text"
            ref={inputRef}
            value={newItem.title}
            onChange={(e) => handleInputChange(e, "title")}
            onKeyDown={handleKeyDown}
            placeholder="Title"
            className=" form-control w-full  border rounded-md border-solid border-[#BEBEBE] focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
          />
          <input
            type="text"
            value={newItem.url}
            onChange={(e) => handleInputChange(e, "url")}
            onKeyDown={handleKeyDown}
            placeholder="URL"
            className="form-control w-full  border rounded-md border-solid border-[#BEBEBE] focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
          />
          <div className="space-x-5">
            <button
              onClick={handleSaveItem}
              className={`px-[30px] py-2 rounded-md bg-orange-400 text-white ${
                isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaveDisabled}
            >
              Save
            </button>
            <button onClick={handleCancel} className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-md px-[30px] py-2">
              Cancel
            </button>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SmallPopUp;
