"use client"
import TextAlign from '@tiptap/extension-text-align'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, {  useState } from 'react'
import { SVGIcon } from '../Icons'
import Link from '@tiptap/extension-link'
import { createPortal } from 'react-dom'
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Focus from '@tiptap/extension-focus'
import Youtube from '@tiptap/extension-youtube'



const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [currentHeading, setCurrentHeading] = useState('Normal');
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);
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

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addImage = () => {
    const url = prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setColor = (color: any) => {
    try {
      editor.chain().focus().setColor(color).run();
      setColorDropdownOpen(false);
    } catch (error) {
      console.error("Error setting color:", error);
    }
  };

  const toggleHighlight = (color: string) => {
    try {
      editor.chain().focus().toggleHighlight({ color }).run();
      setHighlight(false);
    } catch (error) {
      console.error("Error setting highlight:", error);
    }
  };


  const addYouTube = () => {
    const url = prompt('Enter YouTube URL');
    if (url) {
      const width = prompt('Enter width (default is 640)');
      const height = prompt('Enter height (default is 480)');
      const youtubeData = {
        src: url,
        width: width ? parseInt(width, 10) : 640,
        height: height ? parseInt(height, 10) : 480,
      };
      editor.commands.setYoutubeVideo(youtubeData);
    }
  };
  const element = document?.getElementById("editor-toolbar");
  return (

    <>
      {element ? createPortal(
        <div className='w-full px-[4%] md:px-[3%] lg:px-[3%] xl:px-[5%] flex bg-[#edf2fa] flex-wrap gap-5 py-[8px] px-[10px] rounded-sm justify-between'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="ittalic" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Strikethrough" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Monospace" />
        </button>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="paragraph" />
        </button>

        <div className="w-[100px] px-[5px] py-0 border-x-[#c7c7c7] border-l border-solid border-r">
          <button className="flex items-center gap-2.5  " onClick={toggleDropdown}>
            {currentHeading} <SVGIcon className="text-lg" name="ArrowDown" />
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
          <SVGIcon className="text-lg" name="Unordered" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Ordered" />
        </button>
        <button
          onClick={() => setTextAlign('left')}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="left" />
        </button>
        <button
          onClick={() => setTextAlign('center')}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Center" />
        </button>
        <button
          onClick={() => setTextAlign('right')}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Right" />
        </button>
        <button
          onClick={() => setTextAlign('justify')}
          className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Justify" />
        </button>
        <button
          onClick={addLink}
          disabled={!editor.can().setMark('link')}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="Link" />
        </button>
        <button
          onClick={removeLink}
          disabled={!editor.isActive('link')}
          className={!editor.isActive('link') ? 'hidden' : ''}
        >
          <SVGIcon className="text-lg" name="unlink" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >

          <SVGIcon className="text-lg" name="code" />
        </button>
        <div className='flex relative'>
          <button onClick={() => setColorDropdownOpen(!colorDropdownOpen)}>
            <SVGIcon className="text-lg" name="Color" />
          </button>
          {colorDropdownOpen && (
            <div className="absolute flex gap-3 flex-wrap w-[150px] border z-[100] bg-white shadow-[3px_3px_5px_#bfbdbd] p-[15px] rounded-sm border-solid border-[#f1f1f1] left-0 top-[35px]">
              <button onClick={() => setColor('#958DF1')} className='bg-[#958DF1] w-[20px] h-[20px]' />
              <button onClick={() => setColor('#F98181')} style={{ backgroundColor: '#F98181' }} className='bg-[#958DF1] w-[20px] h-[20px]' />
              <button onClick={() => setColor('#FBBC88')} style={{ backgroundColor: '#FBBC88' }} className='bg-[#FBBC88] w-[20px] h-[20px]' />
              <button onClick={() => setColor('#FAF594')} style={{ backgroundColor: '#FAF594' }} className='bg-[#FAF594] w-[20px] h-[20px]' />
              <button onClick={() => setColor('#70CFF8')} style={{ backgroundColor: '#70CFF8' }} className='bg-[#70CFF8] w-[20px] h-[20px]' />
              <button onClick={() => setColor('#94FADB')} style={{ backgroundColor: '#94FADB' }} className='bg-[#94FADB] w-[20px] h-[20px]' />
              <button onClick={() => setColor('#B9F18D')} style={{ backgroundColor: '#B9F18D' }} className='bg-[#B9F18D] w-[20px] h-[20px]' />
            </div>
          )}
        </div>

        <button onClick={() => editor.chain().focus().unsetColor().run()}><SVGIcon className="text-lg" name="unsetcolor" /></button>
        <div className='highlight flex relative'>
          <button onClick={() => setHighlight(!highlight)}>
            <SVGIcon className="text-lg" name="Highlight" />
          </button>
          {highlight && (
            <div className="absolute flex gap-3 flex-wrap w-[150px] border z-[100] bg-white shadow-[3px_3px_5px_#bfbdbd] p-[15px] rounded-sm border-solid border-[#f1f1f1] left-0 top-[35px]">
              <button onClick={() => toggleHighlight('#958DF1')} className='bg-[#958DF1] w-[20px] h-[20px]' />
              <button onClick={() => toggleHighlight('#F98181')} style={{ backgroundColor: '#F98181' }} className='bg-[#958DF1] w-[20px] h-[20px]' />
              <button onClick={() => toggleHighlight('#FBBC88')} style={{ backgroundColor: '#FBBC88' }} className='bg-[#FBBC88] w-[20px] h-[20px]' />
              <button onClick={() => toggleHighlight('#FAF594')} style={{ backgroundColor: '#FAF594' }} className='bg-[#FAF594] w-[20px] h-[20px]' />
              <button onClick={() => toggleHighlight('#70CFF8')} style={{ backgroundColor: '#70CFF8' }} className='bg-[#70CFF8] w-[20px] h-[20px]' />
              <button onClick={() => toggleHighlight('#94FADB')} style={{ backgroundColor: '#94FADB' }} className='bg-[#94FADB] w-[20px] h-[20px]' />
              <button onClick={() => toggleHighlight('#B9F18D')} style={{ backgroundColor: '#B9F18D' }} className='bg-[#B9F18D] w-[20px] h-[20px]' />
            </div>
          )}
        </div>
        <button onClick={addImage}>
          <SVGIcon className="text-lg" name="image" />
        </button>
        <button onClick={addYouTube}>
          <SVGIcon className="text-lg" name="YoutubeVideo" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <SVGIcon className="text-lg" name="blockquote" />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <SVGIcon className="text-lg" name="horizontal" />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <SVGIcon className="text-lg" name="break" />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <SVGIcon className="text-lg" name="erasser" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <SVGIcon className="text-lg" name="undo" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <SVGIcon className="text-lg" name="redo" />
        </button>

        </div>, element) : null}

    </>
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
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  Image,
  Color,
  TextStyle,

]



export const Tiptap = () => {
  return (
    <div className='my-5'>
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions}></EditorProvider>
    </div>
  )
}
