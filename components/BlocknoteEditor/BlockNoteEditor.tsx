"use client"
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useState } from "react";
import "@blocknote/mantine/style.css";


export const BlockNoteEditor: React.FC = () => {
  // Stores the document JSON.
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "heading",
        content: "This is a heading block",
      },
      {
        type: "paragraph",
        content: "This is a paragraph block",
      },
      {
        type: "paragraph",
      },
    ],
  });

  return (
    <div className="wrapper">
      <div className="item">
        <BlockNoteView
          editor={editor}
          onChange={() => {
            setBlocks(editor.document);
          }}
          data-color-scheme="light"
        />
      </div>
      <div className="mt-5">BlockNote JSON:</div>
      <div className="item bordered">
        <pre>
          <code>{JSON.stringify(blocks, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
