import React from "react";
import { useFormContext } from "react-hook-form";

function InputAuth({ name, label, validation, ...props }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="flex flex-col">
                <label className="text-white">{label}</label>
                <input
                    {...register(name, validation)}
                    {...props}
                    className="border-gray-300 border-[2px] rounded-[6px] p-2 outline-none focus:outline-none focus:border-gray-400 focus:ring-0 focus:shadow-none"
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

export default InputAuth;
