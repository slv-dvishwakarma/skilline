import React, { useState } from "react";
import { SVGIcon } from "../Icons";

interface TerminalProps {
  data?: {
    code?: any;
  };
}

export const Terminal: React.FC<TerminalProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (data?.code) {
      navigator.clipboard
        .writeText(data?.code)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy code: ", err));
    }
  };

  return (
    <>
      {data ? (
        <div className="my-[20px]">
          <div className="terminal bg-[#4E5769] text-white flex justify-between text-[13px]  px-5 py-[10px]">
            <span className="flex gap-3 items-center">
              <SVGIcon name="terminal" />
              <p>Terminal</p>
            </span>
            <span
              className="flex gap-3 items-center cursor-pointer"
              onClick={handleCopy}
            >
              <SVGIcon name="copy" />
              <p>{copied ? "Copied" : "Copy"}</p>
            </span>
          </div>
          <div className="command bg-[#5E687E] px-5 py-[3px] text-white h-20 items-center flex">
            <p>{data?.code}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
