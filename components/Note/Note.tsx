import React, { useState, useEffect } from 'react';
import { SVGIcon } from '../Icons';

interface NoteProps {
  icon: string;
  title: string;
  label: string;
  onChange: (updatedContent: { icon: string; title: string; label: string }) => void;
  onDelete: () => void;
}

export const Note: React.FC<NoteProps> = ({ icon, title, label, onDelete, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(icon);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentLabel, setCurrentLabel] = useState(label);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    setCurrentIcon(icon);
    setCurrentTitle(title);
    setCurrentLabel(label);
  }, [icon, title, label]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleSave = () => {
    onChange({ icon: currentIcon, title: currentTitle, label: currentLabel });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentIcon(icon);
    setCurrentTitle(title);
    setCurrentLabel(label);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className='relative' id='note'>
      {!isEditing ? (
        <div>
          <div className='note bg-[#25353A] rounded-xl px-[20px] py-8 space-y-5'>
            <div className='text-2xl font-display font-bold text-[#44AC99] flex items-center gap-2.5'>
              <SVGIcon name={icon} />
              <span>{title}</span>
            </div>
            <p className='whitespace-pre-wrap my-4 text-white'>{label}</p>
          </div>
          <div className='absolute w-10 text-center right-0 flex items-center w-[10%] gap-3.5 -bottom-3.5'>
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
      ) : (
        <div className='bg-[#25353A] rounded-xl px-[20px] py-8 space-y-5'>
          <div className='text-2xl font-display font-bold  flex items-center gap-2.5'>
          <input
            type="text"
            value={currentIcon}
            onChange={(e) => setCurrentIcon(e.target.value)}
            className="text-[#44AC99] bg-[transparent] w-[20%] focus:outline-none"
          />
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="text-[#44AC99] bg-[transparent] w-[80%] focus:outline-none"
          />
          </div>
          <textarea
            value={currentLabel}
            onChange={(e) => setCurrentLabel(e.target.value)}
            className="bg-[transparent] whitespace-pre-wrap text-white w-full focus:outline-none"
          />
          <div className='absolute w-10 text-center right-0 flex items-center w-[10%] gap-3.5 -bottom-3.5'>
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
      )}

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
