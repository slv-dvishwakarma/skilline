"use client"
import TextAlign from '@tiptap/extension-text-align'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useState } from 'react'
import { SVGIcon } from '../Icons'

const MenuBar = () => {
    const { editor } = useCurrentEditor();
    const [currentHeading, setCurrentHeading] = useState('Normal');
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    if (!editor) {
      return null;
    }
  
    const handleHeadingChange = (level: any) => {
      editor.chain().focus().toggleHeading({ level }).run();
      setCurrentHeading(`h${level}`);
      if (!editor.isActive('heading', { level })) {
        setCurrentHeading('Normal');
      }
      setDropdownOpen(false); // Close dropdown after selecting an option
    };
  
    const toggleDropdown = () => {
      setDropdownOpen((prev) => !prev);
    };
  
    const setTextAlign = (alignment: any) => {
      editor.chain().focus().setTextAlign(alignment).run();
    };

  return (
    <div className='flex bg-white flex-wrap gap-5 border py-[8px] px-[10px] rounded-sm border-solid border-[#f1f1f1]'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <SVGIcon name="bold" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <SVGIcon name="italic" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <SVGIcon name="Strikethrough" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <SVGIcon name="Monospace" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
       <SVGIcon name="paragraph" />
      </button>

      <div className="dropdown border border-solid border-[#f1f1f1] w-[90px]">
        <button className="dropbtn flex items-center gap-2.5  " onClick={toggleDropdown}>
          {currentHeading} <SVGIcon name="ArrowDown" />
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            {[1, 2, 3, 4, 5, 6].map(level => (
              <p
                key={level}
                onClick={() => handleHeadingChange(level)}
                className={editor.isActive('heading ', { level }) ? 'is-active cursor-pointer' : 'cursor-pointer'}
              >
                h{level} 
              </p>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <SVGIcon name="Unordered" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <SVGIcon name="Ordered" />
      </button>
      {/* <button
        onClick={() => setTextAlign('left')}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        Left
      </button>
      <button
        onClick={() => setTextAlign('center')}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        Center
      </button>
      <button
        onClick={() => setTextAlign('right')}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        Right
      </button>
      <button
        onClick={() => setTextAlign('justify')}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        Justify
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <SVGIcon name="code" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <SVGIcon name="blockquote" />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <SVGIcon name="horizontal" />
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
       <SVGIcon name="break" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <SVGIcon name="undo" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <SVGIcon name="redo" />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
    </div>
  )
}

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    
  }),
  TextAlign
]



export const Tiptap = () => {
  return (
    <div className='my-5'>
    <EditorProvider  slotBefore={<MenuBar />} extensions={extensions}></EditorProvider>
    </div>
  )
}
