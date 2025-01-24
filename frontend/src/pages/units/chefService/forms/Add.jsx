import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import Select from "../../../../components/forms/Select";
import { unites } from "../../../../services/unites";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function Add({ handleAdd, type , option}) {

    const methodAdd = useForm()
    const{watch , reset , setValue } = methodAdd
    const unit_type_value = watch("unit_type");


    const onSubmitAdd = async (data) => {
        const unit_data = {
            ...data,
            nom: (data.nom).toUpperCase(),
            division_id:
                data.division_id == "" ? null : Number(data.division_id),
            isDivision: data.unit_type == "isDivision",
            isBureau: data.unit_type == "isBureau",
            isDependant: data.division_id ? true : false,
        };
        delete unit_data.unit_type;

        try {
            const unite = await unites.new(unit_data)
            if (unite) {
                notifySuccess()
                handleAdd()
            }
        } catch (error) {
            console.log(error);
            notifyError()
        }
    };


    useEffect(() => {
        if (unit_type_value == "isDivision") {
            setValue("division_id", null);
        }
    }, [unit_type_value]);

    return (
        <>
            <FormProvider {...methodAdd}>
                <form
                    onSubmit={methodAdd.handleSubmit(onSubmitAdd)}
                    className="min-w-[20vw]"
                >
                    <div className="text-center text-lg">Nouvelle unité</div>
                    <div className="mt-6">
                        <Input
                            label={"Nom :"}
                            name={"nom"}
                            validation={{
                                required: "valeure requise",
                            }}
                        />
                    </div>

                    <div className="mt-3">
                        <Select
                            label={"Type d'unité :"}
                            name={"unit_type"}
                            options={type}
                            className="border-[2px] border-gray-300 px-3 py-2 rounded-[8px] cursor-pointer"
                            validation={{
                                required: "Valeur requise",
                            }}
                        />
                    </div>
                    {unit_type_value == "isBureau" && (
                        <div className="mt-3">
                            <Select
                                label={"Sur-Unité :"}
                                name={"division_id"}
                                options={option}
                                className="border-[2px] border-gray-300 px-3 py-2 rounded-[8px] cursor-pointer"
                            />
                        </div>
                    )}

                    <div className="mt-6 flex flex-row justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 py-1 px-3 text-white rounded-[8px]"
                        >
                            valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Add;
