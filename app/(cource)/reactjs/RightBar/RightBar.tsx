"use client"
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Description } from '@/components/Description';
import { Terminal } from '@/components/Terminal';
import { Title } from '@/components/Title';
import { YoutubeVideo } from '@/components/YoutubeVideo';
import { Note } from '@/components/Note';
import { Code } from '@/components/Code';
import { TOC } from '@/components/TOC';
import { QuillEditor } from '@/components/Editor/Editor';

interface RightBarProps {
  data: {
    id?: string;
    type: string;
    props: object;
    content: object;
    children: object;
  }[];
}

const reorderJson = (item: any) => {
  const { id, type, props, content, children } = item;
  return { id, type, props, content, children };
};

export const RightBar: React.FC<RightBarProps> = ({ data }) => {
  const [items, setItems] = useState<any[]>([]);
  const [jsonString, setJsonString] = useState<string>('');

  useEffect(() => {
    const loadedData = data.map(item => ({ ...item, id: uuidv4() }));
    setItems(loadedData);
    setJsonString(JSON.stringify(loadedData.map(reorderJson), null, 2));
  }, [data]);

  const onChange = (id: string, updatedContent: any) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, content: [updatedContent] };
      }
      return item;
    });
    setItems(updatedItems);
    setJsonString(JSON.stringify(updatedItems.map(reorderJson), null, 2));
    console.log(updatedItems);
  };

  const onDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setJsonString(JSON.stringify(updatedItems.map(reorderJson), null, 2));
    console.log(updatedItems);
  };

  const render: { [key: string]: React.FC<any> } = {
    title: Title,
    description: Description,
    YoutubeVideo,
    terminal: Terminal,
    note: Note,
    code: Code,
    toc: TOC,
    editor: QuillEditor,
  };

  return (
    <div className="space-y-4 p-8">
      {items.map((item, index) => {
        const RenderItem = render[item.type];
        if (!RenderItem) {
          return (
            <div key={index} className="text-red-500 font-[600]">
              {item.type} template is not found
            </div>
          );
        }
        return (
          <div key={item.id}>
            <RenderItem
              {...item.props} // Spread props directly here
              {...(item.content && item.content.length > 0 ? item.content[0] : {})}
              onChange={(updatedContent: any) => onChange(item.id, updatedContent)}
              onDelete={() => onDelete(item.id)}
            />
          </div>
        );
      })}
      <code className='w-full overflow-x-scroll flex'>
        <pre>{jsonString}</pre>
      </code>
    </div>
  );
};
