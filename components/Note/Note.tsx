import React from 'react'
import { SVGIcon } from '../Icons';

interface NoteItem {
    icon: string;
    title: string;
    label: string;
}

interface NoteProps {
    notes?: NoteItem;
}

export const Note: React.FC<NoteProps> = ({ notes }) => {
  return (
    <>
    {notes ? (
    <div className='note bg-[#25353A] rounded-xl px-[20px] py-8 space-y-5'>
        <div className='text-2xl font-display font-bold text-[#44AC99] flex items-center gap-2.5'>
            <SVGIcon name={notes?.icon} />
            <span>{notes?.title}</span>
        </div>
        <p className='whitespace-pre-wrap my-4 text-white'>{notes?.label}</p>
    </div>
    ) : (null)}
    </>
  )
}