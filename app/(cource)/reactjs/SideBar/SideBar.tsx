"use client"
import { SVGIcon } from '@/components/Icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CategoryItem {
  title: string;
  url: string;
}

interface SidebarItem {
  category: string;
  sub_category: CategoryItem[];
}

interface SideBarProps {
  sidebar: SidebarItem[];
  close?: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ sidebar, close }) => {
  const pathName = usePathname();
  const [sidebarData, setSidebarData] = useState<SidebarItem[]>(sidebar);
  const [toggles, setToggles] = useState<boolean[]>(Array(sidebar.length).fill(true));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEditData, setCurrentEditData] = useState<any>(null); // Stores the data being edited (category or subcategory)
  const [editType, setEditType] = useState<string>(''); // 'category' or 'subcategory'
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<{ index: number; subIndex?: number | null }>({ index: -1, subIndex: null });

  useEffect(() => {
    const isSidebarActive = sidebarData.some(item => {
      return item.sub_category.some(subItem => {
        return subItem.url && subItem.url === pathName;
      });
    });

    // if (isSidebarActive && close) {
    //   close();
    // }
  }, [pathName, sidebarData, close]);

  const handleToggle = (index: number) => {
    setToggles(toggles.map((toggle, i) => (i === index ? !toggle : toggle)));
  };

  const handleDeleteCategory = (index: number) => {
    setDeleteData({ index, subIndex: null });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubCategory = (categoryIndex: number, subCategoryIndex: number) => {
    setDeleteData({ index: categoryIndex, subIndex: subCategoryIndex });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const { index, subIndex } = deleteData;

    if (subIndex === null) {
      // Delete category
      const updatedSidebar = sidebarData.filter((_, i) => i !== index);
      setSidebarData(updatedSidebar);
      setToggles(toggles.filter((_, i) => i !== index)); // Update toggles state as well
    } else {
      // Delete subcategory
      const updatedSidebar = [...sidebarData];
      updatedSidebar[index].sub_category = updatedSidebar[index].sub_category.filter((_, i) => i !== subIndex);
      setSidebarData(updatedSidebar);
    }

    setIsDeleteModalOpen(false);
  };

  const handleAddSubCategory = (categoryIndex: number) => {
    const newSubCategory: CategoryItem = { title: "New SubCategory", url: "/new-url" };
    const updatedSidebar = [...sidebarData];
    updatedSidebar[categoryIndex].sub_category = [...updatedSidebar[categoryIndex].sub_category, newSubCategory];
    setSidebarData(updatedSidebar);
  };

  const openEditModal = (data: any, type: string) => {
    setCurrentEditData(data);
    setEditType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditData(null);
    setEditType('');
  };

  const saveChanges = (newData: any) => {
    if (editType === 'category') {
      const updatedSidebar = [...sidebarData];
      const index = updatedSidebar.findIndex(item => item.category === currentEditData.category);

      if (currentEditData.category === "New Category") {
        // It's a new category, add it to the list
        updatedSidebar.push({ category: newData.category, sub_category: [] });
        setToggles([...toggles, true]); // Add toggle state for the new category
      } else if (index !== -1) {
        // Existing category, update it
        updatedSidebar[index].category = newData.category;
      } else {
        console.error("Category not found");
        return;
      }

      setSidebarData(updatedSidebar);
    } else if (editType === 'subcategory') {
      const updatedSidebar = [...sidebarData];
      const categoryIndex = updatedSidebar.findIndex(item => item.category === currentEditData.parentCategory);
      if (categoryIndex === -1) {
        console.error("Parent category not found");
        return;
      }
      const subCategoryIndex = updatedSidebar[categoryIndex].sub_category.findIndex(subItem => subItem.title === currentEditData.title);
      if (subCategoryIndex === -1) {
        console.error("Subcategory not found");
        return;
      }
      updatedSidebar[categoryIndex].sub_category[subCategoryIndex] = { title: newData.title, url: newData.url };
      setSidebarData(updatedSidebar);
    }
    closeModal();
  };

  return (
    <div className='SideBar space-y-3'>
      <button className='flex gap-2.5 items-center' onClick={() => openEditModal({ category: "New Category" }, 'category')}><SVGIcon className="w-[25px] h-[25px] flex justify-center items-center leading-[25px] border rounded-[50%] border-solid border-tertiary text-tertiary" name="Plus" /> Add Category</button>
      {sidebarData.map((item, index) => (
        <div key={index}>
          <div className='flex items-center justify-between text-blog_title cursor-pointer text-common' >
            <h3 className="text-lg font-medium">{item.category}</h3>
            <div className='w-3/12 justify-between flex'>
              <button type='button' onClick={() => openEditModal(item, 'category')}><SVGIcon name="edit" /></button>
              <button type='button' onClick={() => handleDeleteCategory(index)}><SVGIcon name="delete" /></button>
              <button type='button' onClick={() => handleToggle(index)}><SVGIcon className="text-lg" name={toggles[index] ? "ArrowUp" : "ArrowDown"} /></button>
            </div>
          </div>
          {toggles[index] && (
            <ul className='text-blog_title py-3 space-y-4'>
              {item.sub_category.map((category, subIndex) => (
                <li key={subIndex} className='flex justify-between'>
                  <Link href={category.url} className={`text-[16px] ${pathName === category.url ? "text-secondary" : "text-blog_title"}`}>{category.title}</Link>
                  <div className='flex w-[15%] justify-between'>
                    <button onClick={() => openEditModal({ ...category, parentCategory: item.category }, 'subcategory')}><SVGIcon name="edit" /></button>
                    <button onClick={() => handleDeleteSubCategory(index, subIndex)}><SVGIcon name="delete" /></button>
                  </div>
                </li>
              ))}
              <button className='flex gap-2.5 items-center' onClick={() => handleAddSubCategory(index)}><SVGIcon className="w-[25px] h-[25px] flex justify-center items-center leading-[25px] border rounded-[50%] border-solid border-tertiary text-tertiary" name="Plus" /> Add SubCategory</button>
            </ul>
          )}
        </div>
      ))}
      {isModalOpen && <Modal data={currentEditData} type={editType} onSave={saveChanges} onClose={closeModal} />}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

const Modal: React.FC<{ data: any, type: string, onSave: (data: any) => void, onClose: () => void }> = ({ data, type, onSave, onClose }) => {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[999] bg-[#00000096]">
      <div className="flex items-center justify-center min-h-screen">
        <div className='relative bg-white xl:w-[40%] lg:w-[50%] md:w-[60%] w-[90%] mx-auto shadow-lg rounded-[20px] p-[20px]'>
          <h2 className='text-[22px] font-semibold text-secondary'>{type === 'category' ? 'Edit Category' : 'Edit SubCategory'}</h2>
          <div className='space-y-5 pt-4'>
          <input
            type="text"
            name={type === 'category' ? 'category' : 'title'}
            value={type === 'category' ? formData.category : formData.title}
            onChange={handleChange}
            className='form-control w-full border rounded-md border-solid border-[#BEBEBE] focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3'
          />
          {type === 'subcategory' && (
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className='form-control w-full border rounded-md border-solid border-[#BEBEBE] focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3'
            />
          )}
          </div>
          <div className='pt-4 space-x-5'>
          <button onClick={handleSave} className='bg-secondary  text-white text-[15px] rounded-[80px] px-[30px] py-2'>Save</button>
          <button onClick={onClose} className='bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal: React.FC<{ onConfirm: () => void, onCancel: () => void }> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#00000096]">
      <div className="flex items-center justify-center min-h-screen">
        <div className='relative bg-white xl:w-[30%] lg:w-[40%] md:w-[50%] w-[80%] mx-auto shadow-lg rounded-[20px] p-[20px]'>
          <h2 className='text-[22px] font-semibold text-secondary'>Confirm Delete</h2>
          <p className='pt-4'>Are you sure you want to delete this item?</p>
          <div className='pt-4 space-x-5'>
            <button onClick={onConfirm} className='bg-secondary text-white text-[15px] rounded-[80px] px-[30px] py-2'>Delete</button>
            <button onClick={onCancel} className='bg-white shadow-[1px_13px_10px_-2px_rgba(34,60,80,0.13)] text-black cursor-pointer text-[15px] rounded-[80px] px-[30px] py-2'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
