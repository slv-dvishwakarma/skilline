import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import editor from "./editor.json"

interface FormValues {
    editor: string;
}


export const QuillInput = () => {

    const { control, handleSubmit } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className='QuillInput'>
            <h3>Which Editor You Want To Add</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <Controller
                        name="editor"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <select
                                {...field}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select a Editor</option>
                                {editor.options.map((option, index) => (
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
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}
