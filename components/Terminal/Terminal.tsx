import React, { useState } from 'react';
import { SVGIcon } from '../Icons';

interface TerminalProps {
    text: string;
    onChange: (prop: any) => void;
    onDelete: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ text, onChange, onDelete }) => {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newCode, setNewCode] = useState(text || "");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch(err => console.error('Failed to copy code: ', err));
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setNewCode(text);
    };

    const handleSave = () => {
        onChange({ text: newCode });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewCode(text);
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
        <div className="my-[20px] relative">
            {isEditing ? (
                <div>
                    <div className="terminal bg-[#4E5769] text-white flex justify-between text-[13px] px-5 py-[10px]">
                        <span className="flex gap-3 items-center">
                            <SVGIcon name="terminal" />
                            <p>Terminal</p>
                        </span>
                        <span className="flex gap-3 items-center cursor-pointer" onClick={handleCopy}>
                            <SVGIcon name="copy" />
                            <p>{copied ? 'Copied' : 'Copy'}</p>
                        </span>
                    </div>
                    <div className="command bg-[#5E687E] px-5 py-[3px] text-white">
                        <input
                            type="text"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            className="w-full bg-[transparent] focus:outline-none text-white h-[74px] items-center flex"
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
                </div>
            ) : (
                <>
                    <div className="terminal bg-[#4E5769] text-white flex justify-between text-[13px] px-5 py-[10px]">
                        <span className="flex gap-3 items-center">
                            <SVGIcon name="terminal" />
                            <p>Terminal</p>
                        </span>
                        <span className="flex gap-3 items-center cursor-pointer" onClick={handleCopy}>
                            <SVGIcon name="copy" />
                            <p>{copied ? 'Copied' : 'Copy'}</p>
                        </span>
                    </div>
                    <div className="command bg-[#5E687E] px-5 py-[3px] text-white h-20 items-center flex">
                        <p>{text}</p>
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
                </>
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
