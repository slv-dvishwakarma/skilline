import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SVGIcon } from '../Icons';

interface CodeProps {
    codeString: string;
    onChange: (prop: any) => void;
    onDelete: () => void;
}

export const Code: React.FC<CodeProps> = ({ codeString, onChange, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [code, setCode] = useState(codeString || "");
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


    const handleEdit = () => {
        setIsEditing(true);
        setCode(codeString);
    };

    const handleSave = () => {
        onChange({ codeString: code });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setCode(codeString);
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
        <div className='relative'>
            {!isEditing ? (
                <div className='bg-code_code  my-5'>
                    <SyntaxHighlighter language="javascript" style={vs}>
                        {codeString || ""}
                    </SyntaxHighlighter>
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
                <div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        autoFocus
                        className="whitespace-pre-wrap w-full h-[300px] focus:outline-none"
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
    )
}
