import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Select from "../../../../components/forms/Select";
import Input from "../../../../components/forms/Input";

function Edit({data , type , option , handleEdit}) {
    const methodEdit = useForm();

    const { watch, setValue, reset } = methodEdit;
    const unit_type_value_edit = watch("unit_type");

    console.log(option)
    
    const onSubmitEdit = async (data) => {
        const edit_data = {
            ...data,
            isDivision: data.unit_type == "isDivision",
            isBureau: data.unit_type == "isBureau",
            isDependant: data.division_id ? true : false,
        };
        delete edit_data.unit_type;
        console.log({ id: data.division_id, ...edit_data });
        handleEdit();
    };


    useEffect(() => {
        if (unit_type_value_edit == "isDivision") {
            setValue("division_id", null);
        }
    }, [ unit_type_value_edit]);

    useEffect(()=>{
        if(data){
            reset({
                nom: data.nom,
                unit_type: data.isDivision ? "isDivision" : "isBureau",
                division_id: data.sur_division ? data.sur_division.id : null,
            });
        }
    } , [data])

    return (

        <>
            <div>
            <FormProvider {...methodEdit}>
                    <form
                        onSubmit={methodEdit.handleSubmit(onSubmitEdit)}
                        className="min-w-[20vw]"
                    >
                        <div className="text-center text-lg">
                            Modification Unité :
                        </div>
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
                        {unit_type_value_edit == "isBureau" && (
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
                                className="bg-blue-500 py-1 px-3 rounded-[8px] text-white"
                            >
                                valider
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}

export default Edit;
