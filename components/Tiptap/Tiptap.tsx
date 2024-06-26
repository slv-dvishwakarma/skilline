"use client"
import TextAlign from '@tiptap/extension-text-align'
import { EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react'
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
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Text } from '../Text'
import { useForm } from 'react-hook-form'
import { Number } from '../Number'
import { FileInput } from '../FileInput'
import ResizeImage from 'tiptap-extension-resize-image';
import FontFamily from '@tiptap/extension-font-family'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { stringify } from 'flatted';
import UniqueID from '@tiptap/extension-unique-id'
import { mergeAttributes } from '@tiptap/core';
import Heading from '@tiptap/extension-heading';
import { v4 as uuidv4 } from 'uuid';
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [activeTab, setActiveTab] = useState(0);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const [highlightDropdownOpen, setHighlightDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [image, setImage] = useState(false);
  const [table, setTable] = useState(false);
  const [video, setVideo] = useState(false);
  const [family, setFamily] = useState(false);
  const [alignment, setAlignment] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const colorDropdownRef = useRef<HTMLDivElement>(null);
  const highlightDropdownRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);
  const alignRef = useRef<HTMLDivElement>(null);

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
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setTable(false);
      }
      if (videoRef.current && !videoRef.current.contains(event.target as Node)) {
        setVideo(false);
      }
      if (familyRef.current && !familyRef.current.contains(event.target as Node)) {
        setFamily(false);
      }
      if (alignRef.current && !alignRef.current.contains(event.target as Node)) {
        setAlignment(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setColorDropdownOpen, setHighlightDropdownOpen, setDropdownOpen, setImage]);


  const addLink = () => {
    const url = prompt('Enter the URL');
    if (url && editor) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };


  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (editor?.isActive) {
        if (event.ctrlKey && event.key === 'k') {
          event.preventDefault();
          addLink();
        } else if (event.altKey && event.shiftKey && event.key === '%') {
          editor.chain().focus().toggleStrike().run();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, addLink]);

  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (editor) {
        if (data.url) {
          const youtubeData = {
            src: data.url,
            width: data.width ? parseInt(data.width, 10) : 640,
            height: data.height ? parseInt(data.height, 10) : 480,
          };
          editor.commands.setYoutubeVideo(youtubeData);
          reset();
          setVideo(false);
        } else if (data.imageurl) {
          const imageData = {
            src: data.imageurl,
          };
          editor.commands.setImage(imageData);
          reset();
          setImage(false);
        } else if (data.imageuploadurl) {
          const file = data.imageuploadurl;
          console.log(file)
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.result) {
                const uploadedImageData = {
                  src: reader.result as string,
                };
                editor.chain().focus().setImage(uploadedImageData).run();
                reset();
                setImage(false);
              }
            };
            reader.onerror = (error) => {
              console.error('Error reading file:', error);
            };
            reader.readAsDataURL(file);
          }
        }
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  };


  useEffect(() => {
    fetchSavedData();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handlePrint = () => {
    if (editor) {
      const printContent = editor.getHTML();

      // Watermark HTML to be inserted
      const watermarkHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.2; z-index: 9999;">
          <p style="font-size: 48px; font-weight: bold;"><img src="/skilline-logo.png" /></p>
        </div>
      `;

      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Skilline-Education</title>
              <style>
                @media print {
                  body {
                    visibility: hidden;
                  }
                  .print-content, .print-content * {
                    visibility: visible;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-content">
                ${printContent}
                ${watermarkHTML}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  window.close();
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };


  const handleSave = async () => {
    const json = editor.getJSON();
    const jsons = JSON.stringify(json, null, 2)
    const url = "http://localhost:3000/api/save-data";
    const response = await fetch(url, {
      method: "POST",
      body: stringify(jsons),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      console.log("success")
      window.location.reload();
    } else {
      console.log("failed");
    }
    // const json = editor.getJSON(); // Get the JSON data from the editor
    // const jsonString = JSON.stringify(json, null, 2); // Convert the JSON data to a string with pretty printing

    // setEditorJson(json); // Save the JSON data to the state variable
    // console.log(jsonString); 
  };

  const fetchSavedData = async () => {
    try {
      const url = "http://localhost:3000/api/save-data";
      //  const url = "https://skilline-educations.netlify.app/api/save-data"
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (editor && data) {
          editor.commands.setContent(data);
        }
      } else {
        console.error('Failed to fetch saved data');
      }
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
    // if (editor && editorJson) {
    //   editor.commands.setContent(editorJson); // Set the content of the editor with the JSON data from the state variable
    // }
  };

  const handleHeadingChange = (level: any) => {
    editor.chain().focus().toggleHeading({ level }).run();
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

  const imageToggle = () => {
    setImage(true)
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
    setVideo(true);
  };

  const insertsTable = () => {
    setTable(true);
  }

  const colors = [
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D'
  ];

  const tabs = [
    "Insert Image Url",
    "Upload From PC"
  ]

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const insertsFonts = () => {
    setFamily(true)
  }

  const handleAlignment = () => {
    setAlignment(!alignment);
  };

  const fonts = [
    "inter",
    "comic-sans",
    "serif",
    "monospace",
    "cursive",
    "comic-sans-quoted",
    "unsetFontFamily",
  ]

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
          
          <Tooltip text='Paragraph (Ctrl+Alt+0)'>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive('paragraph') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="paragraph" />
            </button>
          </Tooltip>
          <Tooltip text='Underline'><button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : ''}
          >
            <SVGIcon name="underline" className="text-[16px] flex justify-center items-center w-6 h-6" />
          </button></Tooltip>
          <div className='relative'>
            <div className="w-[83px] flex items-center px-2 gap-2.5 border-x-[#c7c7c7] border-l border-solid border-r" ref={dropdownRef}>
              <button className="flex items-center gap-2.5" onClick={toggleDropdown}>
                <p>Fonts</p> <SVGIcon className="text-[16px] w-[10%]" name="ArrowDown" />
              </button>
            </div>
            <div className='relative' ref={dropdownRef}>
              {dropdownOpen && (
                <div className="w-[200px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[13px] transform z-[999]">
                  <div className='divide-y-2'>
                    {[1, 2, 3, 4, 5, 6].map(level => (
                      <p
                        key={level}
                        onClick={() => handleHeadingChange(level)}
                        className={`cursor-pointer px-2 py-2.5 relative z-[999] ${editor.isActive('heading', { level }) ? 'bg-gray-200' : ''}`}
                      >
                        Heading {level} (Ctrl+Alt+{level})
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='table'>
            {table ? (
              <div className='flex items-center gap-2.5 cursor-pointer' onClick={insertsTable}>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Table" />
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="ArrowDown" />
              </div>
            ) : (
              <Tooltip text='Insert Table'><div className='flex items-center gap-2.5 cursor-pointer' onClick={insertsTable}>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Table" />
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="ArrowDown" />
              </div></Tooltip>
            )}
            <div className='relative' ref={tableRef}>
              {table ? (
                <div className="w-[220px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[13px]  transform  z-[999] h-[300px] overflow-scroll">
                  <ul className="button-group divide-y-2">
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); setTable(false); }}>Insert table</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().addColumnBefore().run(); setTable(false); }}>Add column before</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().addColumnAfter().run(); setTable(false); }}>Add column after</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().deleteColumn().run(); setTable(false); }}>Delete column</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().addRowBefore().run(); setTable(false); }}>Add row before</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().addRowAfter().run(); setTable(false); }}>Add row after</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().deleteRow().run(); setTable(false); }}>Delete row</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().deleteTable().run(); setTable(false); }}>Delete table</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().mergeCells().run(); setTable(false); }}>Merge cells</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().splitCell().run(); setTable(false); }}>Split cell</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().toggleHeaderColumn().run(); setTable(false); }}>Toggle header column</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().toggleHeaderRow().run(); setTable(false); }}>Toggle header row</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().toggleHeaderCell().run(); setTable(false); }}>Toggle header cell</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().mergeOrSplit().run(); setTable(false); }}>Merge or split</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().setCellAttribute('colspan', 2).run(); setTable(false); }}>Set cell attribute</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().fixTables().run(); setTable(false); }}>Fix tables</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().goToNextCell().run(); setTable(false); }}>Go to next cell</button></li>
                    <li className="leading-8"><button onClick={() => { editor.chain().focus().goToPreviousCell().run(); setTable(false); }}>Go to previous cell</button></li>
                  </ul>
                </div>
              ) : (null)}
            </div>
          </div>
          <div className='font family'>
            {family ? (
              <div className='flex items-center gap-2.5 cursor-pointer' onClick={insertsFonts}>
                <p>Font Family</p>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="ArrowDown" />
              </div>
            ) : (
              <Tooltip text='Insert Fonts'><div className='flex items-center gap-2.5 cursor-pointer' onClick={insertsFonts}>
                <p>Font Family</p>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="ArrowDown" />
              </div></Tooltip>
            )}
            <div className='relative' ref={familyRef}>
              {family ? (
                <div className="w-[200px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[13px] transform z-[999] h-[250px] overflow-scroll">
                  <ul className="button-group divide-y-2">
                    {fonts.map((font, index) => (
                      <li key={index} className="leading-8">
                        <button
                          onClick={() => {
                            editor.chain().focus().setFontFamily(font).run();
                            setFamily(false);
                          }}
                          className={` w-full text-left px-2 ${editor.isActive('textStyle', { fontFamily: font }) ? 'bg-gray-200' : ''}`}
                          data-test-id="inter"
                        >
                          {font}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (null)}
            </div>
          </div>
          <Tooltip text='Subscript (Ctrl+ ,)'><button
            onClick={() => {
              if (editor.isActive('subscript')) {
                editor.chain().focus().unsetSubscript().run();
              } else {
                editor.chain().focus().setSubscript().run();
              }
            }}
          >
            <SVGIcon className="text-[22px] flex justify-center items-center w-6 h-6" name="Subscript" />
          </button>
          </Tooltip>
          <Tooltip text='Superscript (Ctrl+ .)'><button
            onClick={() => {
              if (editor.isActive('superscript')) {
                editor.chain().focus().unsetSuperscript().run();
              } else {
                editor.chain().focus().setSuperscript().run();
              }
            }}
          >
            <SVGIcon className="text-[22px] flex justify-center items-center w-6 h-6" name="Superscript" />
          </button>
          </Tooltip>
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
          <div className='alignment dropdown'>
            {!alignment ? (
              <Tooltip text='Align Item'>
                <button onClick={handleAlignment} className='flex items-center'>
                  <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="align" />
                  <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="ArrowDown" />
                </button>
              </Tooltip>
            ) : (
              <button onClick={handleAlignment} className='flex items-center'>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="align" />
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="ArrowDown" />
              </button>
            )}
            <div className='relative' ref={alignRef}>
              {alignment ? (
                <div className='tabs w-[150px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[12px] text-center left-1/2 transform -translate-x-1/2 z-[999]'>
                  <div className="absolute w-0 h-0 top-[-5px] -translate-x-2/4 border-b-[5px] border-b-white border-x-[5px] border-x-transparent border-solid left-2/4"></div>
                  <div className='flex justify-between'>
                    <Tooltip text='Left Align (Ctrl+Shift+L)'>
                      <button
                        onClick={() => { setTextAlign('left'); setAlignment(false); }}
                        className={editor.isActive({ textAlign: 'left' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}

                      >
                        <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="left" />
                      </button>
                    </Tooltip>
                    <Tooltip text='Center Align (Ctrl+Shift+E)'>
                      <button
                        onClick={() => { setTextAlign('center'); setAlignment(false); }}
                        className={editor.isActive({ textAlign: 'center' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
                      >
                        <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Center" />
                      </button>
                    </Tooltip>
                    <Tooltip text='Right Align (Ctrl+Shift+R)'>
                      <button
                        onClick={() => { setTextAlign('right'); setAlignment(false); }}
                        className={editor.isActive({ textAlign: 'right' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
                      >
                        <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Right" />
                      </button>
                    </Tooltip>
                    <Tooltip text='Justify (Ctrl+Shift+J)'>
                      <button
                        onClick={() => { setTextAlign('justify'); setAlignment(false); }}
                        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
                      >
                        <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="Justify" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ) : (null)}
            </div>
          </div>
          <Tooltip text='Code'>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active bg-[#D3E3FD] w-6 h-6 flex items-center justify-center rounded' : 'bg-[transparant] w-6 h-6 flex items-center justify-center rounded'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="code" />
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
              className={!editor.isActive('link') ? 'text-[#5f6368] opacity-60' : 'text-black'}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="unlink" />
            </button>
          </Tooltip>
          <div className='relative' >
            {colorDropdownOpen ? (
              <button onClick={() => setColorDropdownOpen(!colorDropdownOpen)}>
                <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="Color" />
              </button>
            ) : (
              <Tooltip text='Text Color'><button onClick={() => setColorDropdownOpen(!colorDropdownOpen)}>
                <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="Color" />
              </button></Tooltip>
            )}
            <div className='relative' ref={colorDropdownRef}>
              {colorDropdownOpen && (
                <div className="tabs w-[120px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[12px] text-center left-1/2 transform -translate-x-1/2 z-[999]">
                  <div className="absolute w-0 h-0 top-[-5px] -translate-x-2/4 border-b-[5px] border-b-white border-x-[5px] border-x-transparent border-solid left-2/4"></div>
                  <div className='flex items-center flex-wrap gap-3'>
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-[20px] h-[20px] ${editor.isActive('textStyle', { color }) ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Tooltip text='Remove Color'>
            <button
              onClick={() => editor.chain().focus().unsetColor().run()}
              className={editor.isActive('textStyle', { color: editor.getAttributes('textStyle').color }) ? 'text-black' : 'text-[#5f6368] opacity-60'}
              disabled={!editor.isActive('textStyle', { color: editor.getAttributes('textStyle').color })}
            >
              <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="unsetcolor" />
            </button>
          </Tooltip>
          <div className='highlight relative' >
            {highlightDropdownOpen ? (
              <button onClick={() => setHighlightDropdownOpen(!highlightDropdownOpen)}>
                <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="Highlight" />
              </button>
            ) : (
              <Tooltip text='Highlight Color'><button onClick={() => setHighlightDropdownOpen(!highlightDropdownOpen)}>
                <SVGIcon className="text-[16px] flex items-center justify-center w-6 h-6" name="Highlight" />
              </button></Tooltip>
            )}
            <div className='relative' ref={highlightDropdownRef}>
              {highlightDropdownOpen && (
                <div className="tabs w-[120px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[12px] text-center left-1/2 transform -translate-x-1/2 z-[999]">
                  <div className="absolute w-0 h-0 top-[-5px] -translate-x-2/4 border-b-[5px] border-b-white border-x-[5px] border-x-transparent border-solid left-2/4"></div>
                  <div className='flex items-center flex-wrap gap-3'>
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleHighlight(color)}
                        style={{ backgroundColor: color }}
                        className={`w-[20px] h-[20px] bg-[${color}] ${editor.isActive('highlight', { color }) ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Tooltip text='Remove Highlight'>
            <button
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              className={editor.isActive('highlight') ? 'text-black' : 'text-[#5f6368] opacity-60'}
              disabled={!editor.isActive('highlight')}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="erasser" />
            </button>
          </Tooltip>
          <div>
            {image ? (
              <button onClick={imageToggle}>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="image" />
              </button>
            ) : (
              <Tooltip text='Image'>
                <button onClick={imageToggle}>
                  <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="image" />
                </button>
              </Tooltip>
            )}
            <div ref={imageRef} className='relative'>
              {image ? (
                <div className="tabs w-[300px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[12px] text-center left-1/2 transform -translate-x-1/2 z-[999]">
                  <div className="absolute w-0 h-0 top-[-5px] -translate-x-2/4 border-b-[5px] border-b-white border-x-[5px] border-x-transparent border-solid left-2/4" />
                  <div className="tab-buttons flex justify-between border border-solid border-[#EDF2FA]">
                    {tabs.map((item, index) => (
                      <button
                        key={index}
                        className={`px-5 py-2.5 w-full ${activeTab === index ? 'bg-[#EDF2FA] text-black' : ''}`}
                        onClick={() => handleTabChange(index)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="tab-content">
                      {activeTab === 0 && <div><Text name="imageurl" placeholder="Enter Image Url" control={control} errors={errors} /></div>}
                      {activeTab === 1 && <div><FileInput name='imageuploadurl' placeholder='Upload Image' control={control} errors={errors} /></div>}
                    </div>
                    <div className='pt-4'>
                      <button type='submit' className='w-full text-center bg-secondary rounded-xl py-1 px-6 font-semibold text-lg text-white transition-all duration-500'>Add</button>
                    </div>
                  </form>
                </div>
              ) : (null)}
            </div>
          </div>
          <div>
            {video ? (
              <button onClick={addYouTube}>
                <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="YoutubeVideo" />
              </button>
            ) : (
              <Tooltip text='Video'>
                <button onClick={addYouTube}>
                  <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="YoutubeVideo" />
                </button>
              </Tooltip>
            )}
            <div ref={videoRef} className='relative'>
              {video ? (
                <div className='w-[205px] p-2.5 top-[5px] absolute bg-white rounded-md border bg-popover text-[12px] text-center left-1/2 transform -translate-x-1/2 z-[999]'>
                  <div className="absolute w-0 h-0 top-[-5px] -translate-x-2/4 border-b-[5px] border-b-white border-x-[5px] border-x-transparent border-solid left-2/4" />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Text name="url" placeholder="Enter Video Url" control={control} errors={errors} />
                    <Number name="width" placeholder="Enter Video Width" required={false} control={control} errors={errors} />
                    <Number name="height" placeholder="Enter Video Height" required={false} control={control} errors={errors} />
                    <div className='pt-4'>
                      <button type='submit' className='w-full text-center bg-secondary rounded-xl py-1 px-6 font-semibold text-lg text-white transition-all duration-500'>Add</button>
                    </div>
                  </form>
                </div>
              ) : (null)}
            </div>
          </div>
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
              className={!editor.can().chain().focus().undo().run() ? 'text-[#5f6368] opacity-60' : ''}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="undo" />
            </button>
          </Tooltip>
          <Tooltip text='Redo'>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className={!editor.can().chain().focus().redo().run() ? 'text-[#5f6368] opacity-60' : ''}
            >
              <SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="redo" />
            </button>
          </Tooltip>
          <Tooltip text='Save'><button onClick={handleSave}><SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="save" /></button></Tooltip>
          <Tooltip text='Print'>
            <button onClick={handlePrint}><SVGIcon className="text-[16px] flex justify-center items-center w-6 h-6" name="print" /></button>
          </Tooltip>
        </div>, element) : null}
    </>
  )
}


const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: element => ({
          id: element.getAttribute('id'),
        }),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }
          return {
            id: attributes.id,
          };
        },
      },
      dataId: {
        default: null,
        parseHTML: element => ({
          dataId: element.getAttribute('data-id'),
        }),
        renderHTML: attributes => {
          if (!attributes.dataId) {
            return {};
          }
          return {
            'data-id': attributes.dataId,
          };
        },
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    if (!HTMLAttributes.id) {
      HTMLAttributes.id = uuidv4(); // Generate UUID if id is not set
    }
    return ['h' + node.attrs.level, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});



const extensions = [
  StarterKit.configure({

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
    types: ['heading', 'paragraph', 'image'],
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
  Table.configure({
    resizable: true,
  }),
  Placeholder.configure({
    placeholder: 'Write something …',
  }),
  UniqueID.configure({
    types: ['heading'],
    attributeName: 'id',
  }),
  CustomHeading.configure({
    HTMLAttributes: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Subscript,
  TableRow,
  TableHeader,
  TableCell,
  Color,
  TextStyle,
  ResizeImage,
  FontFamily,
  Image,
  Underline,
  Superscript,
]




export const Tiptap = () => {


  return (
    <div className='my-5 placeholderdesign' id="shohtml">
      <EditorProvider slotBefore={<MenuBar />} extensions={extensions}>
      </EditorProvider>
    </div>
  );
};