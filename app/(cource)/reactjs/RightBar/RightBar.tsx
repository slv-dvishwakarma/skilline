"use client"
import { Code } from '@/components/Code';
import { Compiler } from '@/components/Compiler';
import GenericDropdown from '@/components/ComponentSelector/ComponentSelector';
import { QuillEditor } from '@/components/Editor/Editor';

import { Note } from '@/components/Note';
import { ChapterInput } from '@/components/SelectedComponent/ChapterInput';
import { CodeInput } from '@/components/SelectedComponent/CodeInput';
import { DescriptionInput } from '@/components/SelectedComponent/DescriptionInput';
import { NoteInput } from '@/components/SelectedComponent/NoteInput';
import { QuillInput } from '@/components/SelectedComponent/QuillInput';
import { TerminalInput } from '@/components/SelectedComponent/TerminalInput';
import { VideoInput } from '@/components/SelectedComponent/VideoInput';
import { Terminal } from '@/components/Terminal';
import Link from 'next/link';
import React, { useState } from 'react';

interface LearnItem {
  title: string;
  url: string;
}

interface NoteItem {
  icon: string;
  title: string;
  label: string;
}

interface DataItem {
  label: string;
  chapter?: string;
  video?: string;
  learn?: LearnItem[];
  code?: string;
  notes?: NoteItem;

}

interface CourseData {
  title: string;
  data: DataItem[];
  codeString?: string;
}

interface RightBarProps {
  course: CourseData | null;
}

export const RightBar: React.FC<RightBarProps> = ({ course }) => {

  const options = [
    { value: 'video', label: 'Video', component: VideoInput },
    { value: 'Terminal', label: 'Terminal', component: TerminalInput },
    { value: 'note', label: 'Note', component: NoteInput },
    { value: 'chapter', label: 'Chapter', component: ChapterInput },
    { value: 'quill', label: 'Quill Editor', component: QuillInput },
    { value: 'description', label: 'Description', component: DescriptionInput },
    { value: 'code', label: 'Code', component: CodeInput },
  ];

  const [content, setContent] = useState<string>('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      {course && (
        <div>
          <h2 className='mdx-heading mt-0 text-blog_title -mx-.5 break-words text-3xl font-display font-bold leading-tight'>{course.title}</h2>
          {course.data.map((item, index) => (

            <div key={index}>
              <div className='mt-4'>
                <iframe src={item.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='w-full xl:h-[400px] lg:h-[400px] md:h-[400px] h-[200px]'></iframe>
              </div>
              <p className='whitespace-pre-wrap my-4 font-display text-xl text-common leading-relaxed'>{item.label}</p>
              {item.chapter ? (
                <div className='p-6 rounded-xl border border-solid border-[gray]'>
                  <h3 className='mdx-heading text-common  mt-0 mb-3 leading-tight text-2xl font-display leading-9 font-bold my-6'>{item.chapter}</h3>
                  <ul className='space-y-2 pl-[22px]'>
                    {item.learn?.map((menu, index) => (
                      <li className='text-common list-disc hover:text-secondary' key={index}><Link href={menu.url}>{menu.title}</Link></li>
                    ))}
                  </ul>
                </div>
              ) : (null)}
              <Terminal code={item.code} />

              <Compiler />

              <Note notes={item.notes} />
              <Code codeString={course.codeString} />
              <div className='pt-10 pb-10'>
              <QuillEditor />
              </div>
              <GenericDropdown options={options} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
