import React, { useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Define custom fonts
const Font = Quill.import('formats/font');
Font.whitelist = ['Arial', 'Verdana', 'Times New Roman', 'Georgia', 'Courier New'];
Quill.register(Font, true);

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
    const quillRef = useRef<ReactQuill | null>(null);

    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            if (editor) {
                editor.on('text-change', () => {
                    const content = quillRef.current?.getEditor().root.innerHTML || "";
                    onChange(content);
                });
            }
        }
    }, [onChange]);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': Font.whitelist }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                ['clean']
            ]
        }
    };

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value || ""}
            onChange={onChange}
            modules={modules}
        />
    );
};
