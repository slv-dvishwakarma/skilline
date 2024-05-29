import classNames from "classnames";
import React, { useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Define custom fonts
const Font = Quill.import("formats/font"); 
Font.whitelist = [
  "Roboto",
  "Raleway",
  "Montserrat",
  "Lato",
  "Rubik",
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Lucida Console",
  "Impact",
  "Arial Black",
  "Comic Sans MS",
  "Tahoma",
  "Geneva",
  "Garamond",
  "Bookman",
  "Courier",
  "Century Schoolbook",
  "Palatino",
  "Times",
  "Arial Narrow",
  "Gadget",
  "Copperplate",
  "Papyrus",
  "Brush Script MT",
  "Segoe UI",
  "Arial Unicode MS",
  "Calibri",
  "Candara",
  "Consolas",
  "Constantia",
  "Corbel",
  "Ebrima",
  "Franklin Gothic Medium",
  "Gabriola",
  "Ink Free",
  "Javanese Text",
  "Leelawadee UI",
  "Microsoft Himalaya",
  "Microsoft JhengHei",
  "Microsoft YaHei",
  "Miriam",
  "Myanmar Text",
  "Nirmala UI",
  "Segoe Script",
  "SimSun",
  "Sitka",
  "Sylfaen",
  "Trebuchet MS",
  "Verdana",
];
Quill.register(Font, true);

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  admin?: boolean;
}

export const QuillEditor: React.FC<any> = ({
  value,
  data,
  onChange,
  admin,
  removeItem,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);
  console.log(data);
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        editor.on("text-change", () => {
          const content = quillRef.current?.getEditor().root.innerHTML || "";
          onChange(content);
        });
      }
    }
  }, [onChange]);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        [{ font: Font.whitelist }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  };

  return (
    <div className="relative">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
      />
      {admin && (
        <div className="absolute top-[-15px] right-0 flex items-center gap-2 z-40">
          <button
            type="button"
            onClick={() => {
              removeItem(data);
            }}
            className={classNames(
              "rounded-full bg-white",
              "  p-1 shadow-2xl border "
            )}
          >
          </button>
        </div>
      )}
    </div>
  );
};
