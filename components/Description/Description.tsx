import React, { useState } from 'react';
import { SVGIcon } from '../Icons';

interface DescriptionProps {
  text: string;
  onChange: (prop: any) => void;
  onDelete: () => void;
}

export const Description: React.FC<DescriptionProps> = ({text, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(text || "");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setNewLabel(text);
  };

  const handleSave = () => {
    onChange({ text: newLabel });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewLabel(text);
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
      <div className="items-center">
        {isEditing ? (
          <div className=''>
            <textarea
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              autoFocus
              className="whitespace-pre-wrap font-display text-xl text-common leading-relaxed border-none w-full h-[173px] focus:outline-[transparent]"
            />
            <div className='w-[10%] flex justify-between'>
              <button onClick={handleSave}>
              <SVGIcon
                  className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center"
                  name="save"
                />
              </button>
              <button onClick={handleCancel}>
              <SVGIcon
                  className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center"
                  name="RxCross2"
                />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="whitespace-pre-wrap my-4 font-display text-xl text-common leading-relaxed">
              {text}
            </p>
            <div className='w-[10%] flex justify-between'>
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
        )}
      </div>
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
