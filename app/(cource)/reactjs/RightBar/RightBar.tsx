"use client"
import { Code } from '@/components/Code';
import { Compiler } from '@/components/Compiler';
import { PythonCompiler } from '@/components/Compiler/PythonCompiler';
import GenericDropdown from '@/components/ComponentSelector/ComponentSelector';
import { Description } from '@/components/Description';
import { QuillEditor } from '@/components/Editor/Editor';

import { Note } from '@/components/Note';
import { ChapterInput } from '@/components/SelectedComponent/ChapterInput';
import { CodeInput } from '@/components/SelectedComponent/CodeInput';
import { DescriptionInput } from '@/components/SelectedComponent/DescriptionInput';
import { NoteInput } from '@/components/SelectedComponent/NoteInput';
import { QuillInput } from '@/components/SelectedComponent/QuillInput';
import { TerminalInput } from '@/components/SelectedComponent/TerminalInput';
import { VideoInput } from '@/components/SelectedComponent/VideoInput';
import { TOC } from '@/components/TOC';
import { Terminal } from '@/components/Terminal';
import { Title } from '@/components/Title';
import { YoutubeVideo } from '@/components/YoutubeVideo';
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
  label?: string;
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
  course: CourseData;
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


  const [editedData, setEditedData] = useState<CourseData | null>(course);
  const [removeButton, setRemoveButton] = useState(true);
  const [removeVideoButton, setRemoveVideoButton] = useState(true);

  const handleTitleEdit = (newTitle: string) => {
    if (editedData) {
      const updatedCourse: CourseData = { ...editedData, title: newTitle };
      setEditedData(updatedCourse);
      console.log(JSON.stringify(updatedCourse));
    }
  };

  const handleTitleDelete = () => {
    if (editedData) {
      const updatedCourse: CourseData = { title: '', data: editedData.data, codeString: editedData.codeString };
      setEditedData(updatedCourse);
      setRemoveButton(false);
      console.log(JSON.stringify(updatedCourse));
    }
  };

  const handleVideoEdit = (index: number, newSrc: string) => {
    if (editedData) {
      const updatedData = editedData.data.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, video: newSrc };
          console.log(JSON.stringify({ video: updatedItem.video }, null, 2));
          return updatedItem;
        }
        return item;
      });
      setEditedData({ ...editedData, data: updatedData });
    }
  };

  const handleVideoDelete = (index: number) => {
    if (editedData) {
      const updatedData = editedData.data.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, video: '' };
          console.log(JSON.stringify({ video: updatedItem.video }, null, 2));
          return updatedItem;
        }
        return item;
      });
      setEditedData({ ...editedData, data: updatedData });
    }
  };

  return (
    <>
      {course && (
        <div>
         {editedData && (
        <div>
          {editedData.data.map((item, index) => (
            <div key={index}>
              <Title
                title={editedData.title}
                index={index} // Pass index to Title component
                onEdit={handleTitleEdit}
                onDelete={handleTitleDelete}
                removeButton={removeButton}
              />
              <YoutubeVideo
                    src={item.video}
                    index={index}
                    onEdit={handleVideoEdit}
                    onDelete={handleVideoDelete}
                    removeButton={removeVideoButton}
                  />
              {/* Render other components based on item data */}
            </div>
          ))}
        </div>
      )}
          {course.data.map((item, index) => (

            <div key={index}>
              
              {/* <YoutubeVideo
                    src={item.video}
                    index={index}
                    onEdit={handleVideoEdit}
                    onDelete={handleVideoDelete}
                  /> */}
              <Description label={item.label} />
              {item.chapter ? (
                <TOC label={item.chapter} toc={item.learn}/>
              ) : (null)}
              <Terminal code={item.code} />

              <Compiler />

              {/* <PythonCompiler /> */}

              <Note notes={item.notes} />
              <Code codeString={course.codeString} />
              <div className='pt-10 pb-10'>
                {/* <QuillEditor /> */}
              </div>
              <GenericDropdown options={options} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
