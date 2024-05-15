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
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[90]"
        onClick={() => setShowAddPopup(false)}
      >
        <div
          className="bg-white p-4 rounded-lg flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            ref={inputRef}
            value={newItem.title}
            onChange={(e) => handleInputChange(e, "title")}
            onKeyDown={handleKeyDown}
            placeholder="Title"
            className="w-full outline-none"
          />
          <input
            type="text"
            value={newItem.url}
            onChange={(e) => handleInputChange(e, "url")}
            onKeyDown={handleKeyDown}
            placeholder="URL"
            className="w-full outline-none"
          />
          <div>
            <button
              onClick={handleSaveItem}
              className={`px-3 rounded-md bg-orange-400 text-white ${
                isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaveDisabled}
            >
              Save
            </button>
            <button onClick={handleCancel} className="px-3">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SmallPopUp;
