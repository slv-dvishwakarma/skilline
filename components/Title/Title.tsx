import React, { useState } from 'react';
import { SVGIcon } from '../Icons';

interface TitleProps {
  title: string;
  onChange: (prop: any) => void;
  onDelete: () => void;
}

export const Title: React.FC<TitleProps> = ({ title, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setNewTitle(title);
  };

  const handleSave = () => {
    onChange({ title: newTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mdx-heading mt-0 text-blog_title -mx-.5 break-words text-3xl font-display font-bold leading-tight">
          {title}
        </h2>
        <div className="flex justify-between w-[10%]">
          <button onClick={handleEdit}>
            <SVGIcon
              className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center"
              name="edit"
            />
          </button>
          <button onClick={handleDelete}>
            <SVGIcon
              className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center"
              name="delete"
            />
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className="fixed inset-0 overflow-y-auto z-[999] bg-[#00000096]">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] mx-auto shadow-lg rounded-[20px] p-[20px]">
              <h2 className="text-[22px] font-semibold text-secondary pb-3">Edit Title</h2>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                className="form-control w-full border rounded-md border-solid border-[#BEBEBE] focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
              />
              <div className="pt-4 space-x-5">
                <button onClick={handleSave} className="bg-secondary text-white text-[15px] rounded-[80px] px-[30px] py-2">
                  Save
                </button>
                <button onClick={handleCancel} className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-[999] bg-[#00000096]">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white xl:w-[30%] lg:w-[40%] md:w-[50%] w-[80%] mx-auto shadow-lg rounded-[20px] p-[20px]">
              <h2 className="text-[22px] font-semibold text-secondary">Confirm Delete</h2>
              <p className="pt-4">Are you sure you want to delete this item?</p>
              <div className="pt-4 space-x-5">
                <button onClick={confirmDelete} className="bg-secondary text-white text-[15px] rounded-[80px] px-[30px] py-2">
                  Delete
                </button>
                <button onClick={cancelDelete} className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
