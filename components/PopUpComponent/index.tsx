import React, { useState } from "react";
import { RiEditLine } from "react-icons/ri";

const EditPopup = ({ onChange, onCancel, initialValue }: any) => {
  const [url, setUrl] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    onChange(event.target.value);
  };

  const handleSave = () => {
    onChange(url);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onCancel()}
    >
      <div
        className="bg-white p-4 rounded-lg justify-between flex flex-col gap-3 w-[70%]"
        onClick={(e: any) => e.stopPropagation()}
      >
        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Enter video URL"
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};

export default EditPopup;
