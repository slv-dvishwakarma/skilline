import React, { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";

export const Compiler = () => {
  const [code, setCode] = useState<string>('console.log("Hello, world!");');
  const [output, setOutput] = useState<string | null>(null);

  const handleChange: OnChange = (value) => {
    setCode(value || '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Execute the code
      const result = eval(code);
      // Check if result is undefined
      if (result === undefined) {
        setOutput("Error: No output");
      } else {
        // Update the output
        setOutput(result.toString());
      }
    } catch (error: any) {
      // Handle any errors
      setOutput("Error: " + (error.message || error.toString()));
    }
  };

  return (
    <div className="flex justify-center items-start pt-10 pb-10">
      <div className="w-full max-w-4xl p-4 border">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              height="50vh"
              defaultLanguage="javascript"
              value={code}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5">{output}</div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Run
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};