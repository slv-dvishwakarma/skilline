import React, { useState } from 'react';
import { SVGIcon } from '../Icons';

interface YoutubeVideoProps {
    src?: string;
    index: number;
    onEdit: (index: number, newSrc: string) => void;
    onDelete: (index: number) => void;
    removeButton: boolean;
}

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ src, index, onEdit, onDelete, removeButton }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [newSrc, setNewSrc] = useState(src || '');

    const handleEditClick = () => {
        setIsEditing(true);
        setNewSrc(src || ''); // Initialize newSrc with the current src
    };

    const handleSaveClick = () => {
        onEdit(index, newSrc);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewSrc(src || '');
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        onDelete(index);
        setShowDeleteConfirmation(false);
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
    };

    return (
        <div className='mt-4'>
            {src && (
                <iframe
                    src={src}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className='w-full xl:h-[400px] lg:h-[400px] md:h-[400px] h-[200px]'
                ></iframe>
            )}
            {isEditing && (
                <div className='fixed inset-0 overflow-y-auto z-[999] bg-[#00000096]'>
                    <div className='flex items-center justify-center min-h-screen'>
                        <div className='relative bg-white xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] mx-auto shadow-lg rounded-[20px] p-[20px]'>
                            <h2 className='text-[22px] font-semibold text-secondary pb-3'>Edit Video</h2>

                            <input
                                type="text"
                                value={newSrc}
                                onChange={(e) => setNewSrc(e.target.value)}
                                className='w-full p-2 border rounded'
                            />
                            <div className='pt-4 space-x-5'>
                                <button onClick={handleSaveClick} className='bg-secondary text-white text-[15px] rounded-[80px] px-[30px] py-2'>Save</button>
                                <button onClick={handleCancelClick} className='bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='flex mt-2'>
                {!isEditing && (
                    <>
                    {removeButton && ( 
                        <div className='flex justify-between w-[10%]'>
                            <button onClick={handleEditClick}><SVGIcon className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center" name="edit" /></button>
                            <button onClick={handleDeleteClick}><SVGIcon className="bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] w-[30px] h-[30px] flex justify-center items-center" name="delete" /></button>
                        </div>
                    )}
                    </>
                )}
            </div>
            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-[999] bg-[#00000096]">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className='relative bg-white xl:w-[30%] lg:w-[40%] md:w-[50%] w-[80%] mx-auto shadow-lg rounded-[20px] p-[20px]'>
                            <h2 className='text-[22px] font-semibold text-secondary'>Confirm Delete</h2>
                            <p className='pt-4'>Are you sure you want to delete this video?</p>
                            <div className='pt-4 space-x-5'>
                                <button onClick={confirmDelete} className='bg-secondary text-white text-[15px] rounded-[80px] px-[30px] py-2'>Delete</button>
                                <button onClick={cancelDelete} className='bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2'>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
