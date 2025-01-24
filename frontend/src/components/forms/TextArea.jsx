import React from "react";
import { useFormContext } from "react-hook-form";

function TextArea({ name, label, validation, ...props }) {

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="flex flex-col">
                <label>{label}</label>
                <textarea
                    {...register(name, validation)}
                    {...props}
                    className=" border-gray-300 border-[2px] rounded-[6px] h-12 p-2"
                />
                {errors[name] && (
                    <p className="text-red-400 max-w-full">
                        {errors[name]?.message}
                    </p>
                )}
            </div>
        </>
    );
}

export default TextArea;
