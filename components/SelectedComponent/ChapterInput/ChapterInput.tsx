import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import chapter from "./chapter.json"

interface FormValues {
  chapter: string;
}

export const ChapterInput: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chapter">
          Chapter
        </label>
        <Controller
          name="chapter"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a chapter</option>  
              {chapter.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          )}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-secondary  text-white text-[15px] rounded-[80px] mt-2.5 px-[50px] py-2.5"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

