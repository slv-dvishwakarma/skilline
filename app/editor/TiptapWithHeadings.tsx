"use client"
import React, { useEffect, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react'; 

interface Heading {
  id: string;
  text: string;
}

const TiptapWithHeadings: React.FC = () => {
  const { editor } = useCurrentEditor();
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (editor) {
      const extractHeadings = () => {
        const extractedHeadings: Heading[] = [];
        editor.state.doc.descendants((node, pos) => {
          if (node.type.name === 'heading') {
            const textContent = node.textContent;
            const id = `heading-${pos}`;
            extractedHeadings.push({ id, text: textContent });
          }
        });
        return extractedHeadings;
      };

      const headingsData = extractHeadings();
      setHeadings(headingsData);
    }
  }, [editor]);

  return (
    <div>
      <h2>Headings with Anchor Links</h2>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TiptapWithHeadings;
