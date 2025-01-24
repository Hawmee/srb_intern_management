import React from "react";
import { useFormContext } from "react-hook-form";

function FileInput({ name, label, validation, ...props }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="flex flex-col">
                <label>{label}</label>
                <input
                    type="file"
                    {...register(name, validation)}
                    {...props}

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

export default FileInput;