import React, { useState, useRef } from 'react';
import { Controller, Control, FieldValues, DeepMap, FieldError } from 'react-hook-form';
import { SVGIcon } from '../Icons';

interface InputProps {
  name: string;
  label?: string;
  placeholder: string;
  control: Control<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

export const FileInput: React.FC<InputProps> = ({ name, placeholder, label, control, errors }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <div>
            {label && <label className='text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left'>{label}</label>}
            <span
              className='px-3 h-[35px] justify-between input-border flex items-center border rounded-md border-solid border-[#BEBEBE] mt-[12px] cursor-pointer'
              onClick={handleClick}
            >
              <span className=''>
                {fileName || placeholder}
              </span>
              <input
                type="file"
                ref={inputFileRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    setFileName(file.name);
                  }
                  onChange(file);
                }}
              />
              <SVGIcon className="text-[15px]" name="upload" />
            </span>
          </div>
        )}
      />
      <div className='mt-[10px]'>
        {errors[name] && <span className="text-red-500 text-sm">Please upload {placeholder}</span>}
      </div>
    </div>
  );
};
