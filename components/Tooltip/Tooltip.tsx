import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode; // Add children prop
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className='group relative'>
      <div>{children}</div>
      <div className="hidden group-hover:block absolute bg-black text-white rounded-md border bg-popover text-[12px] w-[100px] text-center left-[-33px] px-[5px] py-[3px]">
        {text}
      </div>
    </div>
  );
};