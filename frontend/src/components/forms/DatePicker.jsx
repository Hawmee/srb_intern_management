import React from "react";
import { useFormContext } from "react-hook-form";

function DatePicker({ name, label, validation, ...props }) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="flex flex-col">
                <label>{label}</label>
                <input
                    {...register(name, validation)}
                    {...props}
                    className=" border-gray-300 border-[2px] rounded-[6px] p-2"
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

export default DatePicker;
