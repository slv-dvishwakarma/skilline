import React, { useState } from 'react';
import Link from 'next/link';
import { SVGIcon } from '../Icons';

interface LearnItem {
    title: string;
    url: string;
}

interface TOCProps {
    label: string;
    toc: LearnItem[];
    onChange: (updatedTOC: { label: string; toc: LearnItem[] }) => void;
}

export const TOC: React.FC<TOCProps> = ({ label, toc, onChange }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(label);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [newItem, setNewItem] = useState<LearnItem>({ title: '', url: '' });
    const [items, setItems] = useState<LearnItem[]>(toc);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const handleLabelEdit = () => {
        setIsEditingLabel(true);
    };

    const handleLabelSave = () => {
        onChange({ label: newLabel, toc: items });
        setIsEditingLabel(false);
    };

    const handleLabelCancel = () => {
        setNewLabel(label);
        setIsEditingLabel(false);
    };

    const handleItemEdit = (index: number) => {
        setEditIndex(index);
        setNewItem(items[index]);
    };

    const handleItemSave = () => {
        const updatedItems = [...items];
        if (editIndex !== null) {
            updatedItems[editIndex] = newItem;
        } else {
            updatedItems.push(newItem);
        }
        setItems(updatedItems);
        onChange({ label: newLabel, toc: updatedItems });
        setEditIndex(null);
        setNewItem({ title: '', url: '' });
    };

    const handleItemCancel = () => {
        setEditIndex(null);
        setNewItem({ title: '', url: '' });
    };

    const handleItemDelete = (index: number) => {
        setDeleteIndex(index);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const updatedItems = items.filter((_, i) => i !== deleteIndex);
            setItems(updatedItems);
            onChange({ label: newLabel, toc: updatedItems });
            setShowDeleteConfirmation(false);
            setDeleteIndex(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeleteIndex(null);
    };

    return (
        <div className='p-6 rounded-xl border border-solid border-gray'>
            <div className='flex justify-between items-center'>
                {isEditingLabel ? (
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="mdx-heading text-black mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6 w-full focus:outline-none"
                    />
                ) : (
                    <h3 className='mdx-heading text-black mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6'>{label}</h3>
                )}
                <div className='flex space-x-2'>
                    {isEditingLabel ? (
                        <>
                            <button onClick={handleLabelSave}>
                                <SVGIcon className="cursor-pointer" name="save" />
                            </button>
                            <button onClick={handleLabelCancel}>
                                <SVGIcon className="cursor-pointer" name="RxCross2" />
                            </button>
                        </>
                    ) : (
                        <button onClick={handleLabelEdit}>
                            <SVGIcon className="cursor-pointer" name="edit" />
                        </button>
                    )}
                </div>
            </div>
            <ul className='space-y-2 pl-[22px]'>
                {items.map((item, index) => (
                    <li className='text-common list-disc hover:text-secondary' key={index}>
                        {editIndex === index ? (
                            <div className='flex items-center space-x-2'>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    className="text-common w-full focus:outline-none border rounded-md border-solid border-[#BEBEBE] px-2.5 py-[5px]"
                                />
                                <input
                                    type="text"
                                    value={newItem.url}
                                    onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                                    className="text-common w-full focus:outline-none border rounded-md border-solid border-[#BEBEBE] px-2.5 py-[5px]"
                                />
                                <button onClick={handleItemSave}>
                                    <SVGIcon className="cursor-pointer" name="save" />
                                </button>
                                <button onClick={handleItemCancel}>
                                    <SVGIcon className="cursor-pointer" name="RxCross2" />
                                </button>
                            </div>
                        ) : (
                            <div className='flex justify-between items-center'>
                                <Link href={item.url}>{item.title}</Link>
                                <div className='flex space-x-2'>
                                    <button onClick={() => handleItemEdit(index)}>
                                        <SVGIcon className="cursor-pointer" name="edit" />
                                    </button>
                                    <button onClick={() => handleItemDelete(index)}>
                                        <SVGIcon className="cursor-pointer" name="delete" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
                {editIndex === null && (
                    <li className='flex items-center space-x-2'>
                        <input
                            type="text"
                            placeholder="New item title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            className="text-common w-full focus:outline-none border rounded-md border-solid border-[#BEBEBE] px-2.5 py-[5px] placeholder:text-[#9D9D9D] text-[14px]"
                        />
                        <input
                            type="text"
                            placeholder="New item URL"
                            value={newItem.url}
                            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                            className="text-common w-full focus:outline-none border rounded-md border-solid border-[#BEBEBE] px-2.5 py-[5px] placeholder:text-[#9D9D9D] text-[14px]"
                        />
                        <button onClick={handleItemSave}>
                            <SVGIcon className="cursor-pointer" name="save" />
                        </button>
                    </li>
                )}
            </ul>

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
