"use client"
import TextAlign from '@tiptap/extension-text-align'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useRef, useState } from 'react'
import { SVGIcon } from '../Icons'
import Link from '@tiptap/extension-link'
import { createPortal } from 'react-dom'
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Focus from '@tiptap/extension-focus'
import Youtube from '@tiptap/extension-youtube'
import { Tooltip } from '../Tooltip'

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [currentHeading, setCurrentHeading] = useState('Font');
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [highlightDropdownOpen, setHighlightDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [image, setImage] = useState(false);

  if (!editor) {
    return null;
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const highlightDropdownRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target as Node)) {
        setColorDropdownOpen(false);
      }
      if (highlightDropdownRef.current && !highlightDropdownRef.current.contains(event.target as Node)) {
        setHighlightDropdownOpen(false);
      }
      if (imageRef.current && !imageRef.current.contains(event.target as Node)) {
        setImage(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, colorDropdownRef, highlightDropdownRef, imageRef]);

  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        addLink();
      } else if (event.altKey && event.shiftKey && event.key === '%') {
        editor.chain().focus().toggleStrike().run();
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, addLink]);


  const handleHeadingChange = (level: any) => {
    editor.chain().focus().toggleHeading({ level }).run();
    setCurrentHeading(editor.isActive('heading', { level }) ? `h${level}` : 'Normal');
    setDropdownOpen(false);
  };

  

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };


  const setTextAlign = (alignment: any) => {
    editor.chain().focus().setTextAlign(alignment).run();
  };



  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addImage = () => {
    setImage(true)
  };

  const addImageUrl = () => {
    const url = prompt('Enter the image URL');
    setImage(false);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();

    }
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(false);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          editor.chain().focus().setImage({ src: reader.result as string }).run();

        }
      };
      reader.readAsDataURL(file);
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
      setHighlightDropdownOpen(false);
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
        <div className='w-full px-[4%] md:px-[3%] lg:px-[3%] xl:px-[5%] flex bg-[#edf2fa] flex-wrap py-[8px] px-[10px] rounded-sm justify-between relative'>
          <Tooltip text='Bold (Ctrl+B)'>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-sm" name="bold" />
            </button>
          </Tooltip>
          <Tooltip text='Italic (Ctrl+I)'>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-xl" name="ittalic" />
            </button>
          </Tooltip>
          <Tooltip text='Strikethrough (Alt+Shift+%)'>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Strikethrough" />
            </button>
          </Tooltip>
          {/* <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
          >
            <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Monospace" />
          </button> */}
          <Tooltip text='Paragraph (Ctrl+Alt+0)'>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="paragraph" />
            </button>
          </Tooltip>

          <div className="relative  px-[5px] py-0 border-x-[#c7c7c7] border-l border-solid border-r" ref={dropdownRef}>
            <button className="flex items-center gap-2.5" onClick={toggleDropdown}>
              <p>{currentHeading}</p> <SVGIcon className="text-[16px] w-[10%]" name="ArrowDown" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow">
                {[1, 2, 3, 4, 5, 6].map(level => (
                  <p
                    key={level}
                    onClick={() => handleHeadingChange(level)}
                    className={`cursor-pointer px-2 py-1  ${editor.isActive('heading', { level }) ? 'bg-gray-200' : ''}`}
                  >
                    H{level}
                  </p>
                ))}
              </div>
            )}
          </div>
          <Tooltip text='BulletList (Ctrl+Shift+8)'>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Unordered" />
            </button>
          </Tooltip>
          <Tooltip text='OrderedList (Ctrl+Shift+7)'>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Ordered" />
            </button>
          </Tooltip>
          <Tooltip text='Left Align (Ctrl+Shift+L)'>
            <button
              onClick={() => setTextAlign('left')}
              className={editor.isActive({ textAlign: 'left' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="left" />
            </button>
          </Tooltip>
          <Tooltip text='Center Align (Ctrl+Shift+E)'>
            <button
              onClick={() => setTextAlign('center')}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Center" />
            </button>
          </Tooltip>
          <Tooltip text='Right Align (Ctrl+Shift+R)'>
            <button
              onClick={() => setTextAlign('right')}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Right" />
            </button>
          </Tooltip>
          <Tooltip text='Justify (Ctrl+Shift+J)'>
            <button
              onClick={() => setTextAlign('justify')}
              className={editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Justify" />
            </button>
          </Tooltip>
          <Tooltip text='Insert Link (Ctrl+K)'>
            <button
              onClick={addLink}
              disabled={!editor.can().setMark('link')}
              className={editor.isActive('link') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Link" />
            </button>
          </Tooltip>
          <Tooltip text='Remove Link'>
            <button
              onClick={removeLink}
              disabled={!editor.isActive('link')}
              className={!editor.isActive('link') ? 'text-[#5f6368]' : ''}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="unlink" />
            </button>
          </Tooltip>
          <Tooltip text='Code'>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="code" />
            </button>
          </Tooltip>
          <Tooltip text='Text Color'>
            <div className='flex relative' ref={colorDropdownRef}>
              <button onClick={() => setColorDropdownOpen(!colorDropdownOpen)}>
                <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="Color" />
              </button>
              {colorDropdownOpen && (
                <div className="absolute flex gap-3 flex-wrap w-[150px] border z-[100] bg-white shadow-[3px_3px_5px_#bfbdbd] p-[15px] rounded-sm border-solid border-[#f1f1f1] left-0 top-[35px]">
                  <button onClick={() => setColor('#958DF1')} style={{ backgroundColor: '#958DF1' }} className='bg-[#958DF1] w-[20px] h-[20px]' />
                  <button onClick={() => setColor('#F98181')} style={{ backgroundColor: '#F98181' }} className='bg-[#958DF1] w-[20px] h-[20px]' />
                  <button onClick={() => setColor('#FBBC88')} style={{ backgroundColor: '#FBBC88' }} className='bg-[#FBBC88] w-[20px] h-[20px]' />
                  <button onClick={() => setColor('#FAF594')} style={{ backgroundColor: '#FAF594' }} className='bg-[#FAF594] w-[20px] h-[20px]' />
                  <button onClick={() => setColor('#70CFF8')} style={{ backgroundColor: '#70CFF8' }} className='bg-[#70CFF8] w-[20px] h-[20px]' />
                  <button onClick={() => setColor('#94FADB')} style={{ backgroundColor: '#94FADB' }} className='bg-[#94FADB] w-[20px] h-[20px]' />
                  <button onClick={() => setColor('#B9F18D')} style={{ backgroundColor: '#B9F18D' }} className='bg-[#B9F18D] w-[20px] h-[20px]' />
                </div>
              )}
            </div>
          </Tooltip>
          <Tooltip text='Remove Color'>
            <button onClick={() => editor.chain().focus().unsetColor().run()}><SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="unsetcolor" /></button></Tooltip>
          <Tooltip text='Highlight Color'>
            <div className='highlight flex relative' ref={highlightDropdownRef}>
              <button onClick={() => setHighlightDropdownOpen(!highlightDropdownOpen)}>
                <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="Highlight" />
              </button>
              {highlightDropdownOpen && (
                <div className="absolute flex gap-3 flex-wrap w-[150px] border z-[100] bg-white shadow-[3px_3px_5px_#bfbdbd] p-[15px] rounded-sm border-solid border-[#f1f1f1] left-0 top-[35px]">
                  <button onClick={() => toggleHighlight('#958DF1')} style={{ backgroundColor: '#958DF1' }} className='bg-[#958DF1] w-[20px] h-[20px]' />
                  <button onClick={() => toggleHighlight('#F98181')} style={{ backgroundColor: '#F98181' }} className='bg-[#958DF1] w-[20px] h-[20px]' />
                  <button onClick={() => toggleHighlight('#FBBC88')} style={{ backgroundColor: '#FBBC88' }} className='bg-[#FBBC88] w-[20px] h-[20px]' />
                  <button onClick={() => toggleHighlight('#FAF594')} style={{ backgroundColor: '#FAF594' }} className='bg-[#FAF594] w-[20px] h-[20px]' />
                  <button onClick={() => toggleHighlight('#70CFF8')} style={{ backgroundColor: '#70CFF8' }} className='bg-[#70CFF8] w-[20px] h-[20px]' />
                  <button onClick={() => toggleHighlight('#94FADB')} style={{ backgroundColor: '#94FADB' }} className='bg-[#94FADB] w-[20px] h-[20px]' />
                  <button onClick={() => toggleHighlight('#B9F18D')} style={{ backgroundColor: '#B9F18D' }} className='bg-[#B9F18D] w-[20px] h-[20px]' />
                </div>
              )}
            </div>
          </Tooltip>
          <Tooltip text='Remove Highlight'>
            <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="erasser" />
            </button>
          </Tooltip>
          <div>
            <Tooltip text='Image'>
              <button onClick={addImage}>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="image" />
              </button>
            </Tooltip>
            <div ref={imageRef}>
              {image ? (
                <div className='flex absolute flex-wrap w-[200px] border rounded shadow-[0_2px_6px_2px_rgba(60,64,67,0.15)] max-h-[calc(100vh_-_94px)] overflow-y-auto bg-[white] z-[999999] p-3.5 border-solid border-transparent'>
                  <button onClick={addImageUrl} className='flex items-center gap-[15px] text-[15px] py-[7px]'><SVGIcon className="text-[15px]" name="upload" />Upload Image Url</button>
                  <label className='flex items-center gap-[15px] text-[15px] py-[7px] cursor-pointer'>
                    <SVGIcon className="text-[15px]" name="Link" />
                    <span>Upload Image File</span>
                    <input type='file' accept='image/*' onChange={uploadImage} className='hidden' />
                  </label>
                </div>
              ) : (null)}
            </div>
          </div>
          <Tooltip text='Video'>
            <button onClick={addYouTube}>
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="YoutubeVideo" />
            </button>
          </Tooltip>
          <Tooltip text='Blockquote'>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="blockquote" />
            </button>
          </Tooltip>
          <Tooltip text='Line'>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="horizontal" />
            </button>
          </Tooltip>
          <Tooltip text='Hard Break'>
            <button onClick={() => editor.chain().focus().setHardBreak().run()}>
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="break" />
            </button>
          </Tooltip>

          <Tooltip text='Undo'>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="undo" />
            </button>
          </Tooltip>
          <Tooltip text='Redo'>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="redo" />
            </button>
          </Tooltip>
        </div>, element) : null}

    </>
  )
}


const extensions = [
  StarterKit.configure({

    heading: {
      HTMLAttributes: {
        class: (level: any) => `heading-${level}`,
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'custom-ul',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'custom-ol',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'custom-li',
      },
    },

  }),

  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Link.configure({
    HTMLAttributes: {
      class: 'custom-link',
    },
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
